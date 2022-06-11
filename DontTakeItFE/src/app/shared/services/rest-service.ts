import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { LucrareSimilara } from "~shared/model/lucrare-similara-model";


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

    seteazaNota(lucrareId: number, nota: string) {
      let fullUrl = this.baseUrl + '/lucrari' + '/' + lucrareId + '/' + nota;
      return this.httpClient.post(fullUrl, { responseType: 'text' });
    }

    comparaLucrari(id1: number, id2: number): Observable<number> {
      let fullUrl = this.baseUrl + '/lucrari/comparare-lucrari' + "?id1=" + id1 + "&id2=" + id2;
      return this.httpClient.get<number>(fullUrl).pipe(map((response: number) => response));
    }

    comparaLucrare(id1: number): Observable<LucrareSimilara> {
      let fullUrl = this.baseUrl + '/lucrari/comparare-lucrare' + "?id1=" + id1;
      return this.httpClient.get<LucrareSimilara>(fullUrl).pipe(map((response: LucrareSimilara) => response));
    }

}