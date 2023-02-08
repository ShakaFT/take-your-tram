import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cluster } from 'src/interfaces/Cluster';
import { Line } from 'src/interfaces/Line';
import { RealTime } from 'src/interfaces/RealTimes';
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';

@Component({
  selector: 'app-clusters-modal',
  templateUrl: './clusters-modal.component.html',
  styleUrls: ['./clusters-modal.component.scss'],
})
export class ClustersModalComponent implements OnInit {

  constructor(private modalControlle: ModalController, private transportsNetwork: TransportsNetworkService, private api: ApiService) { }

  @Input() line: Line | null = null

  clusters: Cluster[] = []
  currentRealTimes: RealTime[] = []

  ngOnInit() { }

  getRealTimesFromLine(clusterCode: string, lineId: string) {
    this.api.getRealtimesFromLine(clusterCode, lineId).subscribe(data => {
      this.currentRealTimes = data
    })
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
    return this.modalControlle.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalControlle.dismiss(null, 'confirm');
  }

}
