import { Observable } from "rxjs";

export interface IHttpGateway {
    get<T = object>(url: string): Observable<T>
}