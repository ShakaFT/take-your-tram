import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Line } from 'src/interfaces/Line';
import { Cluster } from 'src/interfaces/Cluster';
import { RealTime } from 'src/interfaces/RealTime';
import { PlannerResource } from 'src/interfaces/PlannerResource';
import { TransportsNetworkService } from './transports-network.service';
import { TimeTable } from 'src/interfaces/TimeTable';
import { TimeTables } from 'src/interfaces/TimeTables';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://data.mobilites-m.fr/api';
  private routeUrl: string =
    'https://data.mobilites-m.fr/api/routers/default/plan?routerId=prod&mode=WALK,TRANSIT&showIntermediateStops=true&numItineraries=3&maxWalkDistance=1000&fromPlace=45.18466,5.73177&toPlace=45.18528,5.78458&arriveBy=false&time=09:55&date=2023-02-07&locale=fr_FR&walkReluctance=10';

  constructor(private http: HttpClient, private transportNetwork: TransportsNetworkService) {}

  public getLines(lineType: string = "", lineId: string = ""): Observable<Line[]> {
    const url = `${this.baseUrl}/routers/default/index/routes`
    const finalUrl = lineType ? `${url}?reseaux=${lineType}` : `${url}?codes=${lineId}`
    return this.http.get<Line[]>(finalUrl);
  }

  public getLinesFromCluster(clusterName: string): Observable<Line[]> {
    return this.http.get<Line[]>(
      `${this.baseUrl}/routers/default/index/clusters/${this.transportNetwork.getClusters().get(clusterName)?.replace(":", ":GEN")}/routes`
    );
  }

  public getClusters(lineId: string): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(
      `${this.baseUrl}/routers/default/index/routes/${lineId}/clusters`
    );
  }

  public getRealtimes(clusterName: string): Observable<RealTime[]> {
    return this.http.get<RealTime[]>(
      `${this.baseUrl}/routers/default/index/clusters/${this.transportNetwork.getClusters().get(clusterName)?.replace(":", ":GEN")}/stoptimes`
    );
  }

  public getRealtimesFromLine(
    clusterCode: string,
    lineId: string
  ): Observable<RealTime[]> {
    return this.http.get<RealTime[]>(
      `${this.baseUrl}/routers/default/index/clusters/${clusterCode}/stoptimes?route=${lineId}`
    );
  }

  public getRoutes(
    fromPlace: string,
    toPlace: string,
    date: string,
    time: string
  ): Observable<PlannerResource> {
    return this.http.get<PlannerResource>(
      `${this.baseUrl}/routers/default/plan?routerId=prod&mode=WALK,TRANSIT&showIntermediateStops=true&numItineraries=3&maxWalkDistance=1000&arriveBy=false&fromPlace=${fromPlace}&toPlace=${toPlace}&date=${date}&time=${time}`
    );
  }

  public getTimeTable(lineId: string, timestamp: number): Observable<TimeTables>{
    return this.http.get<TimeTables>(
      `${this.baseUrl}/ficheHoraires/json?route=${lineId}&time=${timestamp}&nbTrips=3`
    );
  }

  public getPolylineJsonFromLine(lineId: string): Observable<any> {
    lineId = lineId.replace(':', '_');
    return this.http.get(
      `${this.baseUrl}/lines/json?types=ligne&codes=${lineId}`
    );
  }
}
