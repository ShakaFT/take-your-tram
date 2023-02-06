import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-route',
  templateUrl: 'route.page.html',
  styleUrls: ['route.page.scss'],
})
export class RoutePage {
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
  ) {}

  startDate: string = ""
  startTime: string = ""
  end = ""
  start = ""

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.end = params['end'],
      this.start = params['start']
    })

    const now = new Date().toISOString()
    this.startDate = now.split('T')[0]
    this.startTime = now.split('T')[1].substring(0, 5)
  }

  public displaySearchClusters(searchbar: string) {
    this.navCtrl.navigateForward(['search'], {
      queryParams: { paramName: searchbar, start: this.start, end: this.end },
    });
  }

  public reverseDestinations() {
    console.log(this.startDate)
    console.log(this.startTime)
    const tmp = this.start
    this.start = this.end
    this.end = tmp
  }
}
