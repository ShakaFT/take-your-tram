import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Itinerary } from 'src/interfaces/Itinerary';
import { Leg } from 'src/interfaces/Leg';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() legs: Leg[] = []
  @Input() duration: string = ""
  @Input() startTime: string = ""
  @Input() endTime: string = ""

  ngOnInit() {}

  public cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public getStart(leg: Leg) {
    return leg.from["name"]
  }

  public getEnd(leg: Leg) {
    return leg.to["name"]
  }
}
