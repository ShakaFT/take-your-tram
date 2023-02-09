import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Itinerary } from 'src/interfaces/Itinerary';
import { Leg } from 'src/interfaces/Leg';
import { ApiService } from 'src/services/api.service';
import { DetailsModalComponent } from '../details-modal/details-modal.component';

@Component({
  selector: 'app-itineraries-modal',
  templateUrl: './itineraries-modal.component.html',
  styleUrls: ['./itineraries-modal.component.scss'],
})
export class ItinerariesModalComponent {
  constructor(private modalCtrl: ModalController, private api: ApiService) {}

  @Input() startName: string = '';
  @Input() endName: string = '';
  @Input() startPositions: string[] = [];
  @Input() endPositions: string[] = [];
  @Input() date: string = '';
  @Input() time: string = '';

  public itineraries: Itinerary[] = [];

  ngOnInit() {
    this.api
      .getRoutes(
        this.startPositions.join(),
        this.endPositions.join(),
        this.date,
        this.time
      )
      .subscribe((plannerResource) => {
        this.itineraries = plannerResource.plan.itineraries.sort((a, b) =>
          a.endTime < b.endTime ? -1 : 1
        );
      });
  }

  public cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public chipToDisplay(leg: Leg) {
    return leg.intermediateStops
      ? `${leg.intermediateStops.length + 1} ${leg.intermediateStops.length + 1 === 1 ? 'arrêt' :'arrêts'}`
      : `${Math.ceil(leg.distance)}m`;
  }

  public confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  public convertSecondsToMinutes(seconds: number) {
    return Math.ceil(seconds / 60);
  }

  public getIcon(mode: string): string {
    switch (mode) {
      case "WALK":
        return 'fa-solid fa-person-walking'

      case "TRAM":
        return 'fa-solid fa-train-tram'

      case "BUS":
        return 'fa-solid fa-bus'

      default:
        return ''
    }
  }

  public getTimeFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  public legsToDisplay(itinerary: Itinerary): Leg[] {
    // Remove mode WALK if there is less than a meter ago
    return itinerary.legs.filter(leg => 
      leg.distance > 200
    )
  }

  public async onClickDetails(itinerary: Itinerary) {
    const modal = await this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: {
        legs: this.legsToDisplay(itinerary),
        duration: this.convertSecondsToMinutes(itinerary.duration),
        startTime: this.getTimeFromTimestamp(itinerary.startTime),
        endTime: this.getTimeFromTimestamp(itinerary.endTime),
      },
    });
    modal.present();
  }
}
