export interface IKafkaGateway {
  initialize(): Promise<void>;
  publishToKafka(topic: string, message: any): Promise<void>;
}
