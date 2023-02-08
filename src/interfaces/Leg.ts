import { Cluster } from "cluster";

export interface Leg {
    startTime: string,
    distance: number,
    endTime: string,
    mode: string,
    route: string,
    routeColor: string,
    routeTextColor: string,
    intermediateStops: Cluster[]
}