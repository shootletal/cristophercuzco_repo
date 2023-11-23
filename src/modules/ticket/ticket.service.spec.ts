import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { ITicketService } from '../../repository/service/iticket-service.interface';
import { ITicketDbGateway } from '../../repository/gateway/iticket-db-gateway.interface';
import { TicketDbGateway } from '../../gateway/database/ticket-db.gateway';
import { KafkaGateway } from '../../gateway/kafka/kafka.gateway';
import { IHttpGateway } from '../../repository/gateway/ihttp-gateway.interface';
import { AxiosHttpGateway } from '../../gateway/axios-http/axios-http.gateway';
import { mockTicketGateway } from '../../mocks/providers/ticket-gateway.mocks';
import {
  fakeDataTicket,
  fakeRequestTicket,
} from '../../mocks/data/ticket-data.mocks';
import { ERRORS } from '../../constants/catalog/errors.catalog';
import { CreateTicketInput } from './dto/create-ticket.input';
import { StatusEnum } from '../../constants/enum/status.enum';
import { mockHttpGateway } from '../../mocks/providers/http-gateway.mocks';
import { IApiFakeResponse } from '../../constants/interfaces/iapi-fake-response.interface';
import { mockKafkaGateway } from '../../mocks/providers/kafka-gateway.mocks';
import { IKafkaGateway } from '../../repository/gateway/ikafka-gateway.interface';
import { KafkaTopicEnum } from '../../constants/enum/kafka-topic.enum';
import { CategoryEnum } from '../../constants/enum/category.enum';

describe('TicketService', () => {
  let ticketService: ITicketService;
  let ticketGatewayMock: jest.Mocked<ITicketDbGateway>;
  let kafkaGatewayMock: jest.Mocked<IKafkaGateway>;
  let httpGatewayMock: jest.Mocked<IHttpGateway>;

  async function bindService(): Promise<void> {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: TicketDbGateway, useValue: ticketGatewayMock },
        { provide: KafkaGateway, useValue: kafkaGatewayMock },
        { provide: AxiosHttpGateway, useValue: httpGatewayMock },
      ],
    }).compile();

    ticketService = module.get<ITicketService>(TicketService);
  }

  beforeEach(async () => {
    kafkaGatewayMock = mockKafkaGateway();
  });

  describe('method create tests', () => {
    const ticket: Ticket = fakeDataTicket[0];
    let requestTicket: CreateTicketInput;
    let responseHttp: IApiFakeResponse;

    beforeEach(() => {
      requestTicket = fakeRequestTicket;
      responseHttp = {
        code: '1',
        state: '604',
      };

      httpGatewayMock = mockHttpGateway({
        get: responseHttp,
      });

      kafkaGatewayMock = mockKafkaGateway({
        publishToKafka: {
          ...responseHttp,
          ticketId: '1',
        },
      });
    });

    function genericTest(ticket?: Ticket) {
      expect(ticketGatewayMock.create).toBeCalledTimes(1);
      expect(kafkaGatewayMock.publishToKafka).toBeCalledWith(
        KafkaTopicEnum.TECHNICAL_SUPPORT,
        { ...responseHttp, ticketId: '1' },
      );
      if (ticket)
        expect(ticket).toEqual({
          ...requestTicket,
          status: StatusEnum.PENDING,
          id: '1',
          createdAt: ticket.createdAt,
        });
    }

    it('should return a saved ticket when category is not error', (done) => {
      ticketGatewayMock = mockTicketGateway({
        createMock: {
          ...ticket,
          ...requestTicket,
          status: StatusEnum.PENDING,
        },
      });

      bindService().then(() => {
        ticketService.createTicket(requestTicket).subscribe({
          next: (ticket: Ticket) => {
            genericTest(ticket);

            done();
          },
        });
      });
    });

    it('should return a custom error when category is equal error', (done) => {
      requestTicket.category = CategoryEnum.ERROR;
      responseHttp = {
        code: '3',
        state: '607',
      };
      ticketGatewayMock = mockTicketGateway({
        createMock: {
          ...ticket,
          ...requestTicket,
          status: StatusEnum.PENDING,
        },
      });

      httpGatewayMock = mockHttpGateway({
        get: responseHttp,
      });

      bindService().then(() => {
        ticketService.createTicket(requestTicket).subscribe({
          error: (err) => {
            genericTest();
            expect(err.error).toEqual(ERRORS.E002);

            done();
          },
        });
      });
    });
  });

  describe('method findAll tests', () => {
    it('should gets all tickets in db', (done) => {
      ticketGatewayMock = mockTicketGateway({
        findAllMock: fakeDataTicket,
      });

      bindService().then(() => {
        ticketService.findAll().subscribe({
          next: (tickets: Ticket[]) => {
            expect(ticketGatewayMock.findAll).toBeCalledTimes(1);
            expect(tickets).toEqual(fakeDataTicket);

            done();
          },
        });
      });
    });

    it('should return custom error when exist any error', (done) => {
      ticketGatewayMock = mockTicketGateway({
        findAllMock: new Error('some error gateway'),
      });

      bindService().then(() => {
        ticketService.findAll().subscribe({
          error: (err) => {
            expect(ticketGatewayMock.findAll).toBeCalledTimes(1);
            expect(err.error).toEqual(ERRORS.E003);

            done();
          },
        });
      });
    });
  });
});
