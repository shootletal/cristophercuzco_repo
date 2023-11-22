import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface IDatabaseConfig {
    getConfiguration(): TypeOrmModuleOptions;
}