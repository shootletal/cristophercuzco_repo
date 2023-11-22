import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { IDatabaseConfig } from "src/repository/config/idatabase-config.interface";

@Injectable()
export class CockroachdbConfig implements IDatabaseConfig {
    public getConfiguration(): TypeOrmModuleOptions {
        return {
            type: "cockroachdb",
            username: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT),
            password: process.env.DB_PASS,
            synchronize: false,
            logging: "all",
            ssl: {
                rejectUnauthorized: false
            },
            entities: [join(__dirname, "../modules/**/**/*.entity{.ts,.js}")],
        }
    }
}