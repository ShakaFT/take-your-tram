import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'https://data.mobilites-m.fr';

  constructor(private http: HttpClient) { }

  // public getWord(lang: string, size: number): Observable<ResponseAPI> {
  //   return this.http.get<ResponseAPI>(
  //     `${this.baseUrl}/words/wordapi.php?lang=${lang.toLowerCase()}&cmd=rand&size=${size}`
  //   );
  // }
}
