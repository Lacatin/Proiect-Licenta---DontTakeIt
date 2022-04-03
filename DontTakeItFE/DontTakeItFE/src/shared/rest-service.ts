import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';


@Injectable({
    providedIn: 'root',
  })
export class RestService{

    baseUrl = 'http://localhost:8081';

    constructor(private httpClient: HttpClient) {
    }

    get<T>(endpoint: string): Observable<T>{
        let fullUrl = this.baseUrl + endpoint;

        return this.httpClient.get<T>(fullUrl).pipe(map((response: T) => response));
    }
}