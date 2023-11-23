import { createMockResponseMocks } from '../createMockResponseMocks';
import { get } from 'lodash';
import { IKafkaGateway } from '../../repository/gateway/ikafka-gateway.interface';

export interface IKafkaGatewayMocks {
  initialize?: any;
  publishToKafka?: any;
}

export const mockKafkaGateway = (
  mocks?: IKafkaGatewayMocks,
): jest.Mocked<IKafkaGateway> => {
  return {
    initialize: createMockResponseMocks(get(mocks, 'initialize')),
    publishToKafka: createMockResponseMocks(get(mocks, 'publishToKafka')),
  };
};
