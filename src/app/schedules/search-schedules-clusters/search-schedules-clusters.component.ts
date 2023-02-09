import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { TransportsNetworkService } from 'src/services/transports-network.service';
import { SchedulesModalComponent } from '../modal/schedules-modal/schedules-modal.component';

@Component({
  selector: 'app-search-schedules-clusters',
  templateUrl: './search-schedules-clusters.component.html',
  styleUrls: ['./search-schedules-clusters.component.scss'],
})
export class SearchSchedulesClustersComponent implements OnInit {
  public clusterNamesToDisplay: string[] = [];
  @ViewChild(IonSearchbar) searchbar: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private transportsNetwork: TransportsNetworkService,
    private modalController: ModalController
  ) {}

  public paramName = '';
  public start = '';
  public end = '';

  ngOnInit() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 150);
    this.route.queryParams.subscribe((params) => {
      this.paramName = params['paramName'];
      this.start = params['start'];
      this.end = params['end'];
    });
  }

  async onClickClusterName(clusterName: string) {
    const modal = await this.modalController.create({
      component: SchedulesModalComponent,
      componentProps: {
        clusterName: clusterName 
      }
    });
    modal.present();
  }

  public onChangeSearchbar(event: any) {
    this.clusterNamesToDisplay = this.transportsNetwork.getClusterNames(
      event.target.value
    );
  }

  public back() {
    this.navCtrl.back()
  }
}
