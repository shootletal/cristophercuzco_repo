import { Test, TestingModule } from '@nestjs/testing';
import { TicketDbGateway } from './ticket-db.gateway';

describe('TicketDbGateway', () => {
  let gateway: TicketDbGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketDbGateway],
    }).compile();

    gateway = module.get<TicketDbGateway>(TicketDbGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
