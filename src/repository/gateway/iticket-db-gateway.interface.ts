import { Observable } from 'rxjs';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { ObjectLiteral } from 'typeorm';

export interface ITicketDbGateway {
  /**
   * gets all items from table ticket
   */
  findAll(): Observable<Ticket[]>;
  /**
   * Create a new item on table ticket
   * @param request - object type Ticket
   */
  create(request: Ticket): Observable<Ticket>;

  /**
   * Get a item that do match by id
   * @param id - uuid of Ticket
   */
  findById(id: string): Observable<Ticket>;

  /**
   * Query on table using an filters
   * @param skip - pagination
   * @param limit - limit items
   * @param conditions - conditions list for query
   */
  findByFilter(
    skip: number,
    limit: number,
    conditions?: ObjectLiteral[],
  ): Observable<Ticket[]>;

  /**
   * Update specific fields on table
   * @param id - id for search item
   * @param updateData - fields to change in database
   */
  updateTicket(id: string, updateData: Partial<Ticket>): Observable<boolean>;
}
