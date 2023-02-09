import { TimeTableStop } from "./TimeTableStop";

export interface TimeTable {
    arrets: TimeTableStop[],
    prevTime: number,
    nextTime: number
}