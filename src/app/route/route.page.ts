import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-route',
  templateUrl: 'route.page.html',
  styleUrls: ['route.page.scss']
})
export class RoutePage {

  constructor(public navCtrl: NavController) {}

  public displaySearchClusters() {
    this.navCtrl.navigateForward(["search"])
  }

}
