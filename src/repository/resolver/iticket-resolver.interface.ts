import { Observable } from "rxjs";
import { CreateTicketInput } from "src/modules/ticket/dto/create-ticket.input";
import { SearchFiltersInput } from "src/modules/ticket/dto/search-filters.input";
import { Ticket } from "src/modules/ticket/entities/ticket.entity";

export interface ITicketResolver {
    getTicket(id: string): Observable<Ticket>;

    createTicket(request: CreateTicketInput): Observable<string>;

    findAll(): Observable<Ticket[]>;

    findByFilter(request: SearchFiltersInput): Observable<Ticket[]>
}