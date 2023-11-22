import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { ITicketResolver } from 'src/repository/resolver/iticket-resolver.interface';
import { Observable, mergeMap, of, map } from 'rxjs';
import { ITicketService } from 'src/repository/service/iticket-service.interface';
import { Inject } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { SearchFiltersInput } from './dto/search-filters.input';

@Resolver(() => Ticket)
export class TicketResolver implements ITicketResolver {
  constructor(@Inject(TicketService) private readonly ticketService: ITicketService) { }

  @Query(() => Ticket)
  public getTicket(@Args('id') id: string): Observable<Ticket> {
    return this.ticketService.getTicketById(id);
  }

  @Query(() => [Ticket])
  public findAll(): Observable<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Query(() => [Ticket], { name: "searchTickets" })
  public findByFilter(@Args('searchTicketsInput') request: SearchFiltersInput): Observable<Ticket[]> {
    return this.ticketService.findByFilter(request);
  }

  @Mutation(() => Boolean)
  public createTicket(@Args('createTicketInput') createTicketInput: CreateTicketInput): Observable<string> {
    return of(1).pipe(
      mergeMap(() => this.ticketService.createTicket(createTicketInput)),
      map((resp: any) => JSON.stringify(resp))
    );
  }
}
