import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import {
  catchError,
  forkJoin,
  iif,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { v4 } from 'uuid';
import { Ticket } from './entities/ticket.entity';
import { SearchFiltersInput } from './dto/search-filters.input';
import { ObjectLiteral } from 'typeorm';
import { cloneDeep, isEmpty } from 'lodash';
import { StatusEnum } from '../../constants/enum/status.enum';
import { IApiFakeResponse } from '../../constants/interfaces/iapi-fake-response.interface';
import { CustomError } from '../../utils/custom-error.utils';
import { ERRORS } from '../../constants/catalog/errors.catalog';
import { KafkaGateway } from '../../gateway/kafka/kafka.gateway';
import { KafkaTopicEnum } from '../../constants/enum/kafka-topic.enum';
import { CategoryTranslate } from '../../constants/catalog/category-translate.catalog';
import { IHttpGateway } from '../../repository/gateway/ihttp-gateway.interface';
import { AxiosHttpGateway } from '../../gateway/axios-http/axios-http.gateway';
import { TicketDbGateway } from '../../gateway/database/ticket-db.gateway';
import { ITicketDbGateway } from '../../repository/gateway/iticket-db-gateway.interface';
import { ITicketService } from '../../repository/service/iticket-service.interface';
import {
  applyDateFilterCondition,
  applyFilterCondition,
} from '../../utils/database-query.utils';
import moment = require('moment');

@Injectable()
export class TicketService implements ITicketService {
  constructor(
    @Inject(AxiosHttpGateway)
    private readonly _httpGateway: IHttpGateway,
    @Inject(TicketDbGateway)
    private readonly _ticketGateway: ITicketDbGateway,
    @Inject(KafkaGateway)
    private readonly _kafkaGateway: KafkaGateway,
  ) {}

  public getTicketById(id: string): Observable<Ticket> {
    return of(1).pipe(mergeMap(() => this._ticketGateway.findById(id)));
  }

  public findAll(): Observable<Ticket[]> {
    return of(1).pipe(
      mergeMap(() => this._ticketGateway.findAll()),
      catchError(() => throwError(() => new CustomError(ERRORS.E003))),
    );
  }

  public findByFilter(filters: SearchFiltersInput): Observable<Ticket[]> {
    const { limit, skip, ...copyFilters } = cloneDeep(filters);

    return of(1).pipe(
      mergeMap(() =>
        this._ticketGateway.findByFilter(
          skip,
          limit,
          this._buildConditionsFilter(copyFilters),
        ),
      ),
    );
  }

  public createTicket(request: CreateTicketInput): Observable<Ticket> {
    const newTicketId: string = v4();
    const categoryCode: number = CategoryTranslate[request.category];

    return of(1).pipe(
      mergeMap(() =>
        forkJoin([
          this._ticketGateway.create({
            ...request,
            id: newTicketId,
            createdAt: moment().valueOf(),
            status: StatusEnum.PENDING,
          }),
          this._processInvokeApiFake(categoryCode),
        ]),
      ),
      mergeMap(([newTicket, responseApi]: [Ticket, IApiFakeResponse]) =>
        this._processTopicAndResponse(newTicket, responseApi, categoryCode),
      ),
    );
  }

  private _processInvokeApiFake(
    categoryCode: number,
  ): Observable<IApiFakeResponse> {
    return of(1).pipe(
      mergeMap(() =>
        this._httpGateway.get<IApiFakeResponse>(
          `https://mockeryget.free.beeceptor.com/api-fake?id=${categoryCode}`,
        ),
      ),
      catchError((error) => {
        console.error(
          '[TICKET SERVICE | _processInvokeApiFake] error: ',
          error,
        );
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }

  private _processTopicAndResponse(
    ticket: Ticket,
    resultApi: IApiFakeResponse,
    categoryCode: number,
  ): Observable<Ticket> {
    const catalogSupport: number[] = [1, 2];

    return of(1).pipe(
      mergeMap(() =>
        this._kafkaGateway.publishToKafka(KafkaTopicEnum.TECHNICAL_SUPPORT, {
          ...resultApi,
          ticketId: ticket.id,
        }),
      ),
      mergeMap(() =>
        iif(
          () => catalogSupport.includes(categoryCode),
          of(ticket),
          throwError(() => new CustomError(ERRORS.E002)),
        ),
      ),
    );
  }

  private _buildConditionsFilter(
    filters: Partial<SearchFiltersInput>,
  ): ObjectLiteral[] {
    const { start, end, ...copyFilters } = cloneDeep(filters);
    const conditions: ObjectLiteral[] = [];

    Object.entries(copyFilters).forEach(([field, value]) => {
      if (value) conditions.push(applyFilterCondition(field, value));
    });

    if (!(isEmpty(start) || isEmpty(end)))
      conditions.push(applyDateFilterCondition('createdAt', start, end));

    return conditions;
  }
}
