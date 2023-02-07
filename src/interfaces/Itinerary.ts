import { Leg } from "./Leg";

export interface Itinerary {
    duration: number,
    startTime: number,
    endTime: number,
    transitTime: number,
    fare: Map<string, any>,
    legs: Leg[],
}