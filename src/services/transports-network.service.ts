import { Injectable } from '@angular/core';
import { Cluster } from 'src/interfaces/Cluster';
import { Line } from 'src/interfaces/Line';

@Injectable({
  providedIn: 'root',
})
export class TransportsNetworkService {
  private transportData: Map<string, Line[]> = new Map<string, Line[]>();
  private clusters: Map<string, string> = new Map<string, string>();

  constructor() {}

  public addLines(typeLines: string, lines: Line[]) {
    this.transportData.set(typeLines, lines);
  }

  public addClusters(newClusters: Cluster[]) {
    newClusters.forEach((newCluster) => {
      if (!this.clusters.has(newCluster.name)) {
        this.clusters.set(newCluster.name, newCluster.id);
      }
    });
  }

  public getTransportData(): Map<string, Line[]> {
    return this.transportData
  }

  public getClusterNames(filter: string = ''): string[] {
    const filteredNames = [...this.clusters.keys()].filter((name) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    filteredNames.sort();
    return filteredNames;
  }
}
