import { Module } from '@nestjs/common';
import { AxiosHttpGateway } from './axios-http/axios-http.gateway';
import { TicketDbGateway } from './database/ticket-db.gateway';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';


@Module({
    providers: [
        AxiosHttpGateway,
        TicketDbGateway,
    ],
    exports: [
        AxiosHttpGateway,
        TicketDbGateway,
    ],
    imports: [TypeOrmModule.forFeature([Ticket])]
})
export class GatewayModule { }
