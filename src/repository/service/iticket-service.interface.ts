import { Observable } from "rxjs";
import { CreateTicketInput } from "src/modules/ticket/dto/create-ticket.input";
import { SearchFiltersInput } from "src/modules/ticket/dto/search-filters.input";
import { Ticket } from "src/modules/ticket/entities/ticket.entity";

export interface ITicketService {
    getTicketById(id: string): Observable<Ticket>;
    createTicket(request: CreateTicketInput): Observable<object>;
    findAll(): Observable<Ticket[]>;
    findByFilter(request: SearchFiltersInput): Observable<Ticket[]>;
}