import { Injectable } from '@angular/core';
import { Line } from 'src/interfaces/Line';

@Injectable({
  providedIn: 'root'
})
export class TransportsNetworkService {

  //transportData: Map<string, Map<string, any>> = new Map<string, Map<string, any>>()
  transportData: Map<string, Line[]> = new  Map<string, Line[]>()

  constructor() { }

  public addLines(typeLines: string, lines: Line[]) {
      this.transportData.set(typeLines, lines)
  }
}
