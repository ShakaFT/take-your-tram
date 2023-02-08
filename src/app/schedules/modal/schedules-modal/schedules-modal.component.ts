import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cluster } from 'src/interfaces/Cluster';
import { Line } from 'src/interfaces/Line';
import { RealTime } from 'src/interfaces/RealTimes';
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';

@Component({
  selector: 'app-schedules-modal',
  templateUrl: './schedules-modal.component.html',
  styleUrls: ['./schedules-modal.component.scss'],
})
export class SchedulesModalComponent implements OnInit {

  constructor(private modalController: ModalController, private transportsNetwork: TransportsNetworkService, private api: ApiService) { }

  @Input() cluster: Cluster | null = null

  currentRealTimes: RealTime[] = []

  ngOnInit() {
    this.getRealTimes(this.cluster?.code)
   }

  getRealTimes(clusterCode: string) {
    this.api.getRealtimes(clusterCode).subscribe(data => {
      this.currentRealTimes = data
    })
  }

  getLineFromRealTime(lineId: string): Line | undefined {
    let lineToReturn: Line | undefined = undefined
    this.transportsNetwork.getTransportData().forEach(lines => {
      lines.forEach(line => {
        if(line.id == lineId) {
          lineToReturn = line
        } 
    })
    })
    return lineToReturn
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
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }

}
