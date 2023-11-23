import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { KafkaGateway } from '../../gateway/kafka/kafka.gateway';
import { ITicketDbGateway } from '../../repository/gateway/iticket-db-gateway.interface';
import { TicketDbGateway } from '../../gateway/database/ticket-db.gateway';
import { Ticket } from '../ticket/entities/ticket.entity';
import { ITopicResponse } from '../../constants/interfaces/i-topic.response';
import { CodeCategoryTranslate } from '../../constants/catalog/category-translate.catalog';
import { mergeMap, Observable, of, Subscription } from 'rxjs';
import { KafkaTopicEnum } from '../../constants/enum/kafka-topic.enum';

@Controller('kafka')
export class KafkaController implements OnModuleInit, OnModuleDestroy {
  private kafkaSubscription: Subscription;

  constructor(
    private readonly _kafka: KafkaGateway,
    @Inject(TicketDbGateway) private _ticketGateway: ITicketDbGateway,
  ) {}

  onModuleDestroy() {
    this.kafkaSubscription.unsubscribe();
  }

  onModuleInit() {
    this.kafkaSubscription = this._kafka
      .subscribeToKafka(KafkaTopicEnum.TECHNICAL_SUPPORT)
      .subscribe((message: ITopicResponse) => {
        this.handleKafkaMessage(message).subscribe((result) => {
          if (result) {
            console.log('Ticket actualizado con éxito');
          } else {
            console.error('Error al actualizar el ticket');
          }
        });
      });
  }

  private handleKafkaMessage(message: ITopicResponse): Observable<boolean> {
    return of(1).pipe(
      mergeMap(() =>
        this._ticketGateway.updateTicket(message.ticketId, <Partial<Ticket>>{
          status: CodeCategoryTranslate[message.state],
        }),
      ),
    );
  }
}
