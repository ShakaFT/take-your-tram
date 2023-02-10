import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Line } from 'src/interfaces/Line';
import { TimeTable } from 'src/interfaces/TimeTable';
import { TimeTables } from 'src/interfaces/TimeTables';
import { TimeTableStop } from 'src/interfaces/TimeTableStop';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-timetable-modal',
  templateUrl: './timetable-modal.component.html',
  styleUrls: ['./timetable-modal.component.scss'],
})
export class TimeTableModalComponent {

  constructor(private modalController: ModalController, private api: ApiService) { }

  @Input() line?: Line

  timesToDisplay: TimeTables[] = []

  page: number = 0

  city1: string = ""
  city2: string = ""

  directionName1: string = ""
  directionName2: string = ""

  date: string = '';
  time: string = '';

  public segment: string = "direction1"

  async ngOnInit() {
    this.setDateTime(Date.now())
    this.timesToDisplay.push(await this.getTimeTables(this.toTimestamp()))
    this.api.getClusters(this.line!.id).subscribe(clusters => {
      const cluster1 = clusters[0]
      const cluster2 = clusters[clusters.length - 1]
      this.city1 = cluster1.city.length > 12 ? `${cluster1.city.substring(0, 12)}...` : cluster1.city
      this.city2 = cluster2.city.length > 12 ? `${cluster2.city.substring(0, 12)}...` : cluster2.city
      this.directionName1 = cluster1.name.length > 12 ? `${cluster1.name.substring(0, 12)}...` : cluster1.name
      this.directionName2 = cluster2.name.length > 12 ? `${cluster2.name.substring(0, 12)}...` : cluster2.name
    })
  }

  async changeDate(e: Event) {
    this.date = String(e)
    await this.reset()
  }

  async changeTime(e: Event) {
    this.time = String(e)
    await this.reset()
  }

  async clickPreviousButton() {
    const currenTime = this.timesToDisplay[this.page]
    const timestamp = this.segment === "direction1" ? currenTime[0].prevTime : currenTime[1].prevTime
    this.setDateTime(timestamp)
    if (this.page !== 0) {
      this.page--
      return
    }
    this.timesToDisplay.unshift(await this.getTimeTables(timestamp))
    console.log(this.timesToDisplay.length)
  }

  async clickNextButton() {
    const currentTime = this.timesToDisplay[this.page]
    const timestamp = this.segment === "direction1" ? currentTime[0].nextTime : currentTime[1].nextTime
    this.setDateTime(timestamp)
    if (this.page === this.timesToDisplay.length - 1) {
      this.timesToDisplay.push(await this.getTimeTables(timestamp))
    }
    console.log(this.timesToDisplay.length)
    this.page++
  }

  getTimeTableStops(): TimeTableStop[] {
    const index = this.segment === 'direction1' ? 0 : 1
    try {
      return this.timesToDisplay[this.page][index].arrets
    } catch {
      return []
    }
  }

  getTripTime(trip: number | string): string {
    if (trip === "|") return trip
    const tripTime = new Date(Number(trip) * 1000)
    return `${tripTime.getHours().toString().padStart(2, "0")}:${tripTime.getMinutes().toString().padStart(2, "0")}`
  }

  getTimeTables(timestamp: number): Promise<TimeTables> {
    return new Promise<TimeTables>((resolve, _) => {
      this.api.getTimeTable(this.line?.id!, timestamp).subscribe(data => {
        resolve(data)
      })
    })
  }

  private async reset() {
    this.timesToDisplay = [ await this.getTimeTables(this.toTimestamp())]
  }

  setDateTime(timestamp: number) {
    const newDate = new Date(timestamp).toLocaleString()
    this.date = newDate.split(" ")[0].split("/").reverse().join("-")
    this.time = newDate.split(" ")[1].slice(0, -3)
  }

  private toTimestamp(): number {
    return Date.parse(`${this.date} ${this.time}`)
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }

}
