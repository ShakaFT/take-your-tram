import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';

@Component({
  selector: 'app-route',
  templateUrl: 'route.page.html',
  styleUrls: ['route.page.scss'],
})
export class RoutePage {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private navCtrl: NavController,
    private transportsNetwork: TransportsNetworkService
  ) {}

  displayError = false;
  startDate: string = '';
  startTime: string = '';
  end = '';
  start = '';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      (this.end = params['end']), (this.start = params['start']);
    });

    const now = new Date().toLocaleString()
    this.startDate = now.split(" ")[0].split("/").reverse().join("-")
    this.startTime = now.split(" ")[1].slice(0, -3)
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

  public searchItineraries() {
    if (!this.start || !this.start) {
      this.displayError = true;
      return;
    }

    const startPositions = this.transportsNetwork.getPositions(this.start);
    const endPositions = this.transportsNetwork.getPositions(this.end);
    this.api
      .getRoutes(
        startPositions.join(),
        endPositions.join(),
        this.startDate,
        this.startTime
      )
      .subscribe((plannerResource) => {
        plannerResource.plan.itineraries.forEach((itinerary) => {
          console.log(itinerary);
        });
      });
  }
}
