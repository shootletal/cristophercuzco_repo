import { Observable } from "rxjs";
import { Ticket } from "src/modules/ticket/entities/ticket.entity";
import { ObjectLiteral } from "typeorm";

export interface ITicketDbGateway {
    /**
        * gets all items from table ticket
    */
    findAll(): Observable<Ticket[]>
    /**
       * Create a new item on table ticket
       * @param request - object type Ticket
       */
    create(request: Ticket): Observable<boolean>;

    /**
   * Get a item that do match by id
   * @param id - uuid of Ticket
   */
    findById(id: string): Observable<Ticket>;

    /**
   * Query on table using an filters
   * @param scanInput - object of scan params
   */
    findByFilter(skip: number, limit: number, conditions?: ObjectLiteral[]): Observable<Ticket[]>;
}