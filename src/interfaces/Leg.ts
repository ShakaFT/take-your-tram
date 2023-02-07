import { Cluster } from "cluster";

export interface Leg {
    startTime: string,
    endTime: string,
    mode: string,
    route: string,
    routeColor: string,
    routeTextColor: string,
    intermediateStops: Cluster[]
}