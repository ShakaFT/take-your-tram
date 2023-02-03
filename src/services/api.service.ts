import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Line } from 'src/interfaces/Line';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'https://data.mobilites-m.fr';

  constructor(private http: HttpClient) { }

  public getLines(lineType: string): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.baseUrl}/api/routers/default/index/routes?reseaux=${lineType}`)
  }

  // public loadStops(): Observable<> {

  // }
}
