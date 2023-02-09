import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Line } from 'src/interfaces/Line';
import { TimeTable } from 'src/interfaces/TimeTable';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-timetable-modal',
  templateUrl: './timetable-modal.component.html',
  styleUrls: ['./timetable-modal.component.scss'],
})
export class TimeTableModalComponent {

  constructor(private modalController: ModalController, private api: ApiService) { }

  @Input() line?: Line

  direction1?: TimeTable
  direction2?: TimeTable

  city1: string = ""
  city2: string = ""
  directionName1: string = ""
  directionName2: string = ""

  public segment: string = "direction1"

  ngOnInit() {
    this.loadTimeTable()
    this.api.getClusters(this.line!.id).subscribe(clusters => {
      const cluster1 = clusters[0]
      const cluster2 = clusters[clusters.length - 1]
      this.city1 = cluster1.city.length > 12 ? `${cluster1.city.substring(0, 12)}...` : cluster1.city
      this.city2 = cluster2.city.length > 12 ? `${cluster2.city.substring(0, 12)}...` : cluster2.city
      this.directionName1 = cluster1.name.length > 12 ? `${cluster1.name.substring(0, 12)}...` : cluster1.name
      this.directionName2 = cluster2.name.length > 12 ? `${cluster2.name.substring(0, 12)}...` : cluster2.name
    })
  }

  getTripTime(trip: number): string {
    const tripTime = new Date(trip * 1000)
    return `${tripTime.getHours().toString().padStart(2, "0")}:${tripTime.getMinutes().toString().padStart(2, "0")}`
  }

  loadTimeTable() {
    this.api.getTimeTable(this.line?.id!, Date.now()).subscribe(data => {
      console.log(data[0])
      this.direction1 = data[0]
      this.direction2 = data[1]
    })
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }

}
