import { Injectable } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { ConsumerRunConfig, EachMessagePayload, Kafka } from 'kafkajs';
import { IKafkaGateway } from '../../repository/gateway/ikafka-gateway.interface';

@Injectable()
export class KafkaGateway implements IKafkaGateway {
  private kafka: Kafka;
  private producer;
  private consumer;

  constructor() {
    this.kafka = new Kafka({
      brokers: [process.env.BROKERS],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'your-consumer-group-id' });

    this.initialize();
  }

  async initialize(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  public async publishToKafka(topic: string, message: any): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  subscribeToKafka(topic: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const config: ConsumerRunConfig = {
        eachMessage: async ({ message }: EachMessagePayload) => {
          const value = JSON.parse(message.value.toString());
          observer.next(value);
        },
      };

      this.consumer.subscribe({ topic, fromBeginning: true });
      this.consumer.run(config);
    });
  }
}
