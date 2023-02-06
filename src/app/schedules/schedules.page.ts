import { Component } from '@angular/core';
import { Line } from 'src/interfaces/Line';
import { TransportsNetworkService } from 'src/services/transports-network.service';
import { LINES_TYPES } from '../constants';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedules.page.html',
  styleUrls: ['schedules.page.scss']
})
export class SchedulesPage {

  constructor(private transportsNetwork: TransportsNetworkService) {}

  transportData: Map<string, Line[]> = new Map<string, Line[]>()
  linesType: string[] = LINES_TYPES

  ngOnInit() {
    this.transportData = this.transportsNetwork.getTransportData()
  }
}
