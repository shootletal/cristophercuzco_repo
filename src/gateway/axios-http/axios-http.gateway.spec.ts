import { Test, TestingModule } from '@nestjs/testing';
import { AxiosHttpGateway } from './axios-http.gateway';

describe('AxiosHttpGateway', () => {
  let gateway: AxiosHttpGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosHttpGateway],
    }).compile();

    gateway = module.get<AxiosHttpGateway>(AxiosHttpGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
