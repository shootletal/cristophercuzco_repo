import { Injectable } from '@nestjs/common';
import { Observable, mergeMap, of, map, catchError, throwError } from 'rxjs';
import { Brackets, ObjectLiteral, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITicketDbGateway } from '../../repository/gateway/iticket-db-gateway.interface';
import { Ticket } from '../../modules/ticket/entities/ticket.entity';
import { CustomError } from '../../utils/custom-error.utils';
import { ERRORS } from '../../constants/catalog/errors.catalog';

@Injectable()
export class TicketDbGateway implements ITicketDbGateway {
  constructor(
    @InjectRepository(Ticket)
    private readonly _repository: Repository<Ticket>,
  ) {}

  public findAll(): Observable<Ticket[]> {
    return of(1).pipe(
      mergeMap(() => this._repository.find()),
      map((resp) => <Ticket[]>resp),
      catchError((error) => {
        console.error('[TICKET GATEWAY | findAll] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }

  public create(request: Ticket): Observable<Ticket> {
    return of(1).pipe(
      mergeMap(() => this._repository.save(request)),
      catchError((error) => {
        console.error('[TICKET GATEWAY | create] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }

  public findById(id: string): Observable<Ticket> {
    return of(1).pipe(
      mergeMap(() =>
        this._repository.findOne({
          where: {
            id,
          },
        }),
      ),
      catchError((error) => {
        console.error('[TICKET GATEWAY | findById] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }

  public findByFilter(
    skip: number,
    limit: number,
    conditions: ObjectLiteral[],
  ): Observable<Ticket[]> {
    return of(1).pipe(
      mergeMap(() =>
        this._repository
          .createQueryBuilder('data')
          .andWhere((qb) => {
            conditions.forEach((condition, index) => {
              if (index > 0) {
                qb.andWhere(
                  new Brackets((innerQb) => innerQb.where(condition)),
                );
              } else {
                qb.where(condition);
              }
            });
          })
          .skip(skip)
          .limit(limit)
          .getMany(),
      ),
      catchError((error) => {
        console.error('[TICKET GATEWAY | findByFilter] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }

  public updateTicket(
    id: string,
    updateData: Partial<Ticket>,
  ): Observable<boolean> {
    return of(1).pipe(
      mergeMap(() => this._repository.update(id, updateData)),
      map((result: UpdateResult) => {
        console.log('Updated rows:', result.affected);
        return result.affected > 0;
      }),
      catchError((error) => {
        console.error('[TICKET GATEWAY | updateTicket] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }
}
