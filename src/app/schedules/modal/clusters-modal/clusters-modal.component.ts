import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cluster } from 'src/interfaces/Cluster';
import { Line } from 'src/interfaces/Line';
import { RealTime } from 'src/interfaces/RealTime';
import { ApiService } from 'src/services/api.service';
import { TimeTableModalComponent } from '../timetable-modal/timetable-modal.component';

@Component({
  selector: 'app-clusters-modal',
  templateUrl: './clusters-modal.component.html',
  styleUrls: ['./clusters-modal.component.scss'],
})
export class ClustersModalComponent {

  constructor(private modalController: ModalController, private api: ApiService) { }

  @Input() line: Line | null = null

  clusters: Cluster[] = []
  currentRealTimes: RealTime[] = []

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

  async openTimeTableModal() {
    const modal = await this.modalController.create({
      component: TimeTableModalComponent,
      componentProps: {
        line: this.line
      },
    });
    modal.present();
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }

}
