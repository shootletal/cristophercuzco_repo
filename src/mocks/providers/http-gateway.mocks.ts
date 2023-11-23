import { createMockResponseMocks } from '../createMockResponseMocks';
import { get } from 'lodash';
import { IHttpGateway } from '../../repository/gateway/ihttp-gateway.interface';

export interface IHttpGatewayMocks {
  get?: any;
}

export const mockHttpGateway = (
  mocks?: IHttpGatewayMocks,
): jest.Mocked<IHttpGateway> => {
  return {
    get: createMockResponseMocks(get(mocks, 'get')),
  };
};
