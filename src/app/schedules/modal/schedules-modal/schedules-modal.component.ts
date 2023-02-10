import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LINES_TYPES } from 'src/app/constants';
import { Line } from 'src/interfaces/Line';
import { RealTime } from 'src/interfaces/RealTime';
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';
import { TimeTableModalComponent } from '../timetable-modal/timetable-modal.component';

@Component({
  selector: 'app-schedules-modal',
  templateUrl: './schedules-modal.component.html',
  styleUrls: ['./schedules-modal.component.scss'],
})
export class SchedulesModalComponent implements OnInit {

  constructor(private modalController: ModalController, private transportsNetwork: TransportsNetworkService, private api: ApiService) { }

  @Input() clusterName: string | null = null

  interval?: NodeJS.Timeout 
  currentRealTimes: RealTime[] = []
  lines: Line[] = []
  linesTypes: string[] = LINES_TYPES

  async ngOnInit() {

    this.api.getLinesFromCluster(this.clusterName!).subscribe(data => {
      this.lines = data
        .filter(line => this.linesTypes.includes(line.type))
        .sort((a, b) => a.shortName < b.shortName ? -1 : 1)
    })

    await this.getRealTimes(this.clusterName!)
    this.interval = setInterval(() => {
       this.getRealTimes(this.clusterName!)
    }, 10000)
  }

  async openTimeTableModal(line: Line) {
    const modal = await this.modalController.create({
      component: TimeTableModalComponent,
      componentProps: {
        line: line
      },
    });
    modal.present();
  }


  async getRealTimes(clusterName: string) {
    return new Promise<void>((resolve, _) => {
      this.api.getRealtimes(clusterName).subscribe(data => {
        this.currentRealTimes = data
        resolve()
      })
    })
  }

  getLineFromRealTime(lineId: string): Line | undefined {
    let lineToReturn: Line | undefined = undefined
    this.transportsNetwork.getTransportData().forEach(lines => {
      lines.forEach(line => {
        if (line.id == lineId) {
          lineToReturn = line
        }
      })
    })
    return lineToReturn
  }

  getCurrentRealTimesOfLine(lineId: string): RealTime[] {
    return this.currentRealTimes.filter(realtime => realtime.pattern.id.includes(`${lineId}:`))
  }

  calculateNextArrival(serviceDay: number, realtimeArrival: number): string {
    const timeBeforeNextArrival = Math.ceil(((serviceDay + realtimeArrival) - (Date.now() / 1000)) / 60)
    return `${timeBeforeNextArrival} min`
  }

  removeDuplicateRealTimes(realTimes: RealTime[]): RealTime[] {

    return realTimes = realTimes.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.pattern.lastStopName === value.pattern.lastStopName
      ))

    )

  }

  cancel() {
    clearInterval(this.interval)
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }

}
