import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TicketModule } from './modules/ticket/ticket.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './modules/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TicketModule,
    KafkaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule {}
