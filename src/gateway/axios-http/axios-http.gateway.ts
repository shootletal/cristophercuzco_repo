import axios, { AxiosResponse } from 'axios';
import { Observable, map, mergeMap, of } from 'rxjs';
import { IHttpGateway } from 'src/repository/gateway/ihttp-gateway.interface';

export class AxiosHttpGateway implements IHttpGateway {
  public get<T>(url: string): Observable<T> {
    return of(1).pipe(
      mergeMap(() =>
        axios.get<T>(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
      map((response: AxiosResponse<T>) => response.data),
    );
  }
}
