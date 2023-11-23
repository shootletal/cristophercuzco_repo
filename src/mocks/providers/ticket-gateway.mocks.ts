import { Ticket } from '../../modules/ticket/entities/ticket.entity';
import { ITicketDbGateway } from '../../repository/gateway/iticket-db-gateway.interface';
import { createMockResponseMocks } from '../createMockResponseMocks';
import { get } from 'lodash';

export interface ITicketGatewayMocks {
  createMock?: Ticket | Error;
  findAllMock?: Ticket[] | Error;
  findByFilterMock?: Ticket[] | Error;
  findByIdMock?: Ticket | Error;
  updateTicketMock?: Ticket | Error;
}

export const mockTicketGateway = (
  mocks?: ITicketGatewayMocks,
): jest.Mocked<ITicketDbGateway> => {
  return {
    create: createMockResponseMocks(get(mocks, 'createMock')),
    findAll: createMockResponseMocks(get(mocks, 'findAllMock')),
    findByFilter: createMockResponseMocks(get(mocks, 'findByFilterMock')),
    findById: createMockResponseMocks(get(mocks, 'findByIdMock')),
    updateTicket: createMockResponseMocks(get(mocks, 'updateTicketMock')),
  };
};
