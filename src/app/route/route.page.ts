import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';
import { ItinerariesModalComponent } from './modal/itineraries-modal/itineraries-modal.component';

@Component({
  selector: 'app-route',
  templateUrl: 'route.page.html',
  styleUrls: ['route.page.scss'],
})
export class RoutePage {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private transportsNetwork: TransportsNetworkService
  ) {}

  displayError = false;
  date: string = '';
  time: string = '';
  end = '';
  start = '';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      (this.end = params['end']), (this.start = params['start']);
    });

    const now = new Date().toLocaleString()
    this.date = now.split(" ")[0].split("/").reverse().join("-")
    this.time = now.split(" ")[1].slice(0, -3)
  }

  public displaySearchClusters(searchbar: string) {
    this.navCtrl.navigateForward(['search'], {
      queryParams: { paramName: searchbar, start: this.start, end: this.end },
    });
  }

  public reverseDestinations() {
    const tmp = this.start;
    this.start = this.end;
    this.end = tmp;
  }

  public async searchItineraries() {
    if (!this.start || !this.start) {
      this.displayError = true;
      return;
    }

    const modal = await this.modalCtrl.create({
      component: ItinerariesModalComponent,
      componentProps: {
        startName: this.start,
        endName: this.end,
        startPositions: this.transportsNetwork.getPositions(this.start),
        endPositions: this.transportsNetwork.getPositions(this.end),
        date: this.date,
        time: this.time,
      },
    });
    modal.present();
  }
}
