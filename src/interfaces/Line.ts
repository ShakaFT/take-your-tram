import { Stop } from "./Stop";

export interface Line {
    id: string,
    gtfsId: string,
    shortName: string,
    longName: string,
    color: string,
    textColor: string,
    mode: string,
    type: string,
    stops: Stop[]
}