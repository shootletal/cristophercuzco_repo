import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { ITicketService } from 'src/repository/service/iticket-service.interface';
import { Observable, catchError, iif, map, mergeMap, of, tap } from 'rxjs';
import { IHttpGateway } from 'src/repository/gateway/ihttp-gateway.interface';
import { CategoryTranslate } from 'src/constants/catalog/category-translate.catalog';
import { AxiosHttpGateway } from 'src/gateway/axios-http/axios-http.gateway';
import { ITicketDbGateway } from 'src/repository/gateway/iticket-db-gateway.interface';
import { TicketDbGateway } from 'src/gateway/database/ticket-db.gateway';
import { v4 } from "uuid";
import { Ticket } from './entities/ticket.entity';
import { SearchFiltersInput } from './dto/search-filters.input';
import {  ObjectLiteral } from 'typeorm';
import { cloneDeep, cond, get, isEmpty, isEqual, unset } from "lodash";
import { applyDateFilterCondition, applyFilterCondition } from 'src/utils/database-query.utils';
import moment = require("moment");

@Injectable()
export class TicketService implements ITicketService {
  constructor(
    @Inject(AxiosHttpGateway)
    private readonly _httpGateway: IHttpGateway,
    @Inject(TicketDbGateway)
    private readonly _ticketGateway: ITicketDbGateway
  ) { }

  public getTicketById(id: string): Observable<Ticket> {
    return of(1).pipe(
      mergeMap(() => this._ticketGateway.findById(id))
    )
  }

  public findAll(): Observable<Ticket[]> {
    return of(1).pipe(
      mergeMap(() => this._ticketGateway.findAll())
    )
  }

  public findByFilter(filters: SearchFiltersInput): Observable<Ticket[]> {
    return of(1).pipe(
      mergeMap(() => this._ticketGateway.findByFilter(filters.skip, filters.limit, this._buildConditionsFilter(filters))),
    )
  }


  public createTicket(request: CreateTicketInput): Observable<object> {
    const catalogSupport: number[] = [1, 2];
    const categoryCode: number = CategoryTranslate[request.category];

    return of(1).pipe(
      mergeMap(() => this._ticketGateway.create({
        ...request,
        id: v4(),
        createdAt: moment().valueOf(), 
      })),
      mergeMap(() =>
        iif(
          () => catalogSupport.includes(categoryCode),
          this._processCategoryError(categoryCode.toString()),
          of({
            error: "no entro"
          })
        )
      ),
    );
  }

  private _processCategoryError(code: string): Observable<object> {
    return of(1).pipe(
      mergeMap(() => this._httpGateway.get<object>(`https://mockeryget.free.beeceptor.com/api-fake?id=${code}`)),
      tap((val) => console.log(val)),
      map((resp: any) => resp),
    )
  }

  private _buildConditionsFilter(filters: SearchFiltersInput): ObjectLiteral[] {
    const { start, end, limit, skip, ...copyFilters } = cloneDeep(filters);
    const conditions: ObjectLiteral[] = [];

    Object.entries(copyFilters).forEach(([field, value]) => {
      if (value) 
        conditions.push(applyFilterCondition(field, value));
    });

    if(!(isEmpty(start) || isEmpty(end)))
      conditions.push(applyDateFilterCondition("createdAt", start, end));

    console.log("sadasdasdasdxzczxcxcxxcxc: ", conditions);

    return conditions;
  }
}
