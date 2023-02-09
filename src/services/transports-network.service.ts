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
    return this.transportData;
  }

  public getClusters(): Map<string, string> {
    return this.clusters;
  }

  public getClusterNames(
    filter: string = '',
    toExclude: string[] = []
  ): string[] {
    const filteredNames = [...this.clusters.keys()].filter(
      (name) =>
        name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(filter.toLowerCase().replace(/\s/g, '')) &&
        !toExclude.includes(name)
    );
    filteredNames.sort();
    return filteredNames;
  }

  public getPositions(clusterName: string): number[] {
    const values = Array.from(this.transportData.values());
    for (let i = 0; i < values.length; i++) {
      const lines = values[i];
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        for (let k = 0; k < line.clusters.length; k++) {
          const cluster = line.clusters[k];
          if (clusterName === cluster.name) {
            return [cluster.lat, cluster.lon];
          }
        }
      }
    }
    return [0, 0];
  }
}
