import { Injectable } from '@angular/core';
import { Line } from 'src/interfaces/Line';
import { TagLines } from 'src/interfaces/TagLines';

@Injectable({
  providedIn: 'root'
})
export class TransportsNetworkService {

  //transportData: Map<string, Map<string, any>> = new Map<string, Map<string, any>>()
  transportData: TagLines[] = []

  constructor() { }

  public addTagLines(tagLines: TagLines) {
      this.transportData.push(tagLines)
  
  //   const data = new Map<string, any>([
  //     ["key1", "value1"],
  //     ["key2", "value2"]
  // ])
  //   this.transportData.set(tagLine.type, data)
  }
}
