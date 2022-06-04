import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
  })
export class RestService{

    private baseUrl = 'http://localhost:8080';

    constructor(private httpClient: HttpClient) {
    }

    get<T>(endpoint: string): Observable<T>{
        let fullUrl = this.baseUrl + endpoint;

        return this.httpClient.get<T>(fullUrl).pipe(map((response: T) => response));
    }

    upload(file: File, studentId: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
    
        formData.append('file', file);
    
        const req = new HttpRequest('POST', this.baseUrl + "/lucrari/" + studentId, formData, {
          reportProgress: true,
          responseType: "blob"
        });
    
        return this.httpClient.request(req);
      }
}