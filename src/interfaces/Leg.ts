import { Cluster } from "./Cluster"


export interface Leg {
    startTime: string,
    distance: number,
    endTime: string,
    mode: string,
    route: string,
    routeColor: string,
    routeId: string
    routeTextColor: string,
    intermediateStops: Cluster[]
    from: any
    to: any
}