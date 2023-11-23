import { of, throwError } from 'rxjs';
import Mock = jest.Mock;
import { isUndefined } from 'lodash';

export const createMockResponseMocks = (
  request: any,
): Mock<any, any, any> | undefined => {
  if (isUndefined(request)) return request;

  return request instanceof Error
    ? jest.fn().mockRejectedValue(throwError(() => request))
    : jest.fn().mockReturnValue(of(request));
};
