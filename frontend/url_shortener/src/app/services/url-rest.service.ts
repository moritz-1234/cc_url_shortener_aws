import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlRestService {
  constructor(private http: HttpClient) {}
  /**
   *
   * @param url input url
   * @returns short url key
   */
  addShortURL(url: string): Observable<{ shortUrl: string }> {
    return this.http.post(
      environment.prefixUrl + '/createShortUrl',
      { url: url },
      {
        responseType: 'json',
      }
    ) as any;
  }
  getLongURL(shortUrl: string): Observable<{ long_url: string }> {
    return this.http.get(environment.prefixUrl + '/getLongUrl', {
      responseType: 'json',
      params: { shortUrl: shortUrl },
    }) as any;
  }
  checkIfOnline(url: string): Observable<{ available: boolean }> {
    return this.http.get(environment.prefixUrl + '/checkIfOnline', {
      responseType: 'json',
      params: { url: url },
    }) as any;
  }
}
