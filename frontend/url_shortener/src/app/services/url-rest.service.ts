import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlRestService {
  constructor(private http: HttpClient) {}
  callAPI(): Observable<string> {
    return this.http.get(
      'https://025j9tgp23.execute-api.eu-north-1.amazonaws.com/hello',
      {
        responseType: 'text',
      }
    );
  }
  /**
   *
   * @param url input url
   * @returns short url key
   */
  addShortURL(url: string): Observable<string> {
    return this.http.post(
      'https://025j9tgp23.execute-api.eu-north-1.amazonaws.com/addShortURL',
      { url: url },
      { responseType: 'text' }
    );
  }
}
