import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cluster } from 'src/interfaces/Cluster';
import { Line } from 'src/interfaces/Line';
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';

@Component({
  selector: 'app-clusters-modal',
  templateUrl: './clusters-modal.component.html',
  styleUrls: ['./clusters-modal.component.scss'],
})
export class ClustersModalComponent implements OnInit {

  constructor(private modalControlle: ModalController, private transportsNetwork: TransportsNetworkService, private api: ApiService) {}

  @Input() line: Line | null = null

  clusters: Cluster[] = []

  ngOnInit() {}

  getRealTimes(clusterCode: string) {
    this.api.getRealtimes(clusterCode).subscribe(data => {
      //TODO save real time
    })
  }

  cancel() {
    return this.modalControlle.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalControlle.dismiss(null, 'confirm');
  }

}
