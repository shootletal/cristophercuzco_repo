import { IApiFakeResponse } from './iapi-fake-response.interface';

export interface ITopicResponse extends IApiFakeResponse {
  ticketId: string;
}
