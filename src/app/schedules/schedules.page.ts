import { Component } from '@angular/core';
import { Line } from 'src/interfaces/Line';
import { TransportsNetworkService } from 'src/services/transports-network.service';
import { LINES_TYPES } from '../constants';

import { ModalController } from '@ionic/angular';
import { ClustersModalComponent } from './modal/clusters-modal/clusters-modal.component';
import { Cluster } from 'src/interfaces/Cluster';


@Component({
  selector: 'app-schedule',
  templateUrl: 'schedules.page.html',
  styleUrls: ['schedules.page.scss']
})
export class SchedulesPage {

  constructor(private transportsNetwork: TransportsNetworkService, private modalController: ModalController) {}

  transportData: Map<string, Line[]> = new Map<string, Line[]>()
  linesTypes: string[] = LINES_TYPES

  ngOnInit() {
    this.transportData = this.transportsNetwork.getTransportData()
  }

  async openModal(line: Line) {
    const modal = await this.modalController.create({
      component: ClustersModalComponent,
      componentProps: {line: line},
    });
    modal.present();
  }
  
}
