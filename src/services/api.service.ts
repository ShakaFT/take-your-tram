import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Line } from 'src/interfaces/Line';
import { Cluster } from 'src/interfaces/Cluster';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'https://data.mobilites-m.fr/api';

  constructor(private http: HttpClient) { }

  public getLines(lineType: string): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.baseUrl}/routers/default/index/routes?reseaux=${lineType}`)
  }

  public getClusters(lineId: string): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(`${this.baseUrl}/routers/default/index/routes/${lineId}/clusters`)
  }
}
