import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  providers: [TicketResolver, TicketService],
  imports: [GatewayModule]
})
export class TicketModule {}
