import { Module } from '@nestjs/common';
import { AxiosHttpGateway } from './axios-http/axios-http.gateway';
import { TicketDbGateway } from './database/ticket-db.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaGateway } from './kafka/kafka.gateway';
import { Ticket } from '../modules/ticket/entities/ticket.entity';
import { InfraestructureModule } from '../infraestructure/infraestructure.module';
import { CockroachdbConfig } from '../infraestructure/cockroach-db.config';
import { IDatabaseConfig } from '../repository/config/idatabase-config.interface';

@Module({
  providers: [AxiosHttpGateway, TicketDbGateway, KafkaGateway],
  exports: [AxiosHttpGateway, TicketDbGateway, KafkaGateway],
  imports: [
    InfraestructureModule,
    TypeOrmModule.forRootAsync({
      imports: [InfraestructureModule],
      inject: [CockroachdbConfig],
      useFactory: (databaseConfig: IDatabaseConfig) =>
        databaseConfig.getConfiguration(),
    }),
    TypeOrmModule.forFeature([Ticket]),
  ],
})
export class GatewayModule {}
