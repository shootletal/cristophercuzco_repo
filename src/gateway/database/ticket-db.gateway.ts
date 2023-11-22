import { Injectable } from "@nestjs/common";
import { Ticket } from "src/modules/ticket/entities/ticket.entity";
import { ITicketDbGateway } from "src/repository/gateway/iticket-db-gateway.interface";
import { Observable, mergeMap, of, map, catchError, throwError } from "rxjs";
import { Brackets, ObjectLiteral, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ERRORS } from "src/constants/catalog/errors.catalog";
import { CustomError } from "src/utils/custom-error.utils";

@Injectable()
export class TicketDbGateway implements ITicketDbGateway {
  constructor(
    @InjectRepository(Ticket)
    private readonly _repository: Repository<Ticket>
  ) { }

  public findAll(): Observable<Ticket[]> {
    return of(1).pipe(
      mergeMap(() => this._repository.find()),
      map((resp) => <Ticket[]>resp),
      catchError((error) => {
        console.error('[TICKET GATEWAY | findAll] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      })
    );
  }

  public create(request: Ticket): Observable<boolean> {
    return of(1).pipe(
      mergeMap(() => this._repository.save(request)),
      map(() => true),
      catchError((error) => {
        console.error('[TICKET GATEWAY | create] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }

  public findById(id: string): Observable<Ticket> {
    return of(1).pipe(
      mergeMap(() => this._repository.findOne({
        where: {
          id
        },
      })),
      catchError((error) => {
        console.error('[TICKET GATEWAY | findById] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    );
  }

  public findByFilter(skip: number, limit: number, conditions: ObjectLiteral[]): Observable<Ticket[]> {
    return of(1).pipe(
      mergeMap(() => this._repository
        .createQueryBuilder('data').andWhere((qb) => {
          conditions.forEach((condition, index) => {
            if (index > 0) {
              qb.andWhere(new Brackets(innerQb => innerQb.where(condition)));
            } else {
              qb.where(condition);
            }
          });
        }).skip(skip).limit(limit).getMany()),
      catchError((error) => {
        console.error('[TICKET GATEWAY | findByFilter] error: ', error);
        return throwError(() => new CustomError(ERRORS.E001));
      }),
    )
  }

}
