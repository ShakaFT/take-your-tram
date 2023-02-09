import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSearchbar, NavController } from '@ionic/angular';
import { TransportsNetworkService } from 'src/services/transports-network.service';

@Component({
  selector: 'app-search-route-clusters',
  templateUrl: './search-route-clusters.component.html',
  styleUrls: ['./search-route-clusters.component.scss'],
})
export class SearchRouteClustersComponent implements OnInit {
  public clusterNamesToDisplay: string[] = [];
  @ViewChild(IonSearchbar) searchbar: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private transportsNetwork: TransportsNetworkService
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

  public onClickClusterName(clusterName: string) {
    this.navCtrl.navigateBack('/tabs/route', {
      queryParams: {
        start: this.start,
        end: this.end,
        [this.paramName]: clusterName,
      },
    });
  }

  public onChangeSearchbar(event: any) {
    this.clusterNamesToDisplay = this.transportsNetwork.getClusterNames(
      event.target.value,
      [this.start, this.end]
    );
  }

  public back() {
    this.navCtrl.navigateBack('/tabs/route', {
      queryParams: { start: this.start, end: this.end },
    });
  }
}
