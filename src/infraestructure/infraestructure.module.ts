import { Module } from '@nestjs/common';
import { CockroachdbConfig } from './cockroach-db.config';

@Module({
  providers: [CockroachdbConfig],
  exports: [CockroachdbConfig],
})
export class InfraestructureModule {}
