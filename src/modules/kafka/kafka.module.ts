import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { GatewayModule } from '../../gateway/gateway.module';

@Module({
  controllers: [KafkaController],
  providers: [],
  imports: [GatewayModule],
})
export class KafkaModule {}
