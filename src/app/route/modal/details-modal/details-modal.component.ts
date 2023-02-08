import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Itinerary } from 'src/interfaces/Itinerary';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() itinerary: Itinerary | undefined

  ngOnInit() {}

  public cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
