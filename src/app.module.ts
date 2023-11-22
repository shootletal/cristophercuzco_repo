import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { TicketModule } from './modules/ticket/ticket.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { ConfigModule } from '@nestjs/config';
import { CockroachdbConfig } from './infraestructure/cockroach-db.config';
import { IDatabaseConfig } from './repository/config/idatabase-config.interface';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraestructureModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    TypeOrmModule.forRootAsync(
      {
        imports: [InfraestructureModule],
        inject: [CockroachdbConfig],
        useFactory: (databaseConfig: IDatabaseConfig) => databaseConfig.getConfiguration(),
      }
    ),
    TicketModule,
  ],
})
export class AppModule { }
