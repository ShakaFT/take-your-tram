import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClustersModalComponent } from 'src/app/schedules/modal/clusters-modal/clusters-modal.component';
import { Leg } from 'src/interfaces/Leg';
import { Line } from 'src/interfaces/Line';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {

  constructor(private api: ApiService, private modalCtrl: ModalController) { }

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

  public getShortName(routeId: string): string {
    // Fix bug
    const shortName = routeId.split(':')[1];
    const linesC = ['1', '2', '3', '4', '5', '6', '7'];
    return linesC.includes(shortName) ? `C${shortName}` : shortName;
  }

  public async onClickChip(shortName: string) {
    const line = await this._getLine(`SEM:${shortName}`)
    const modal = await this.modalCtrl.create({
      component: ClustersModalComponent,
      componentProps: { line: line },
    });
    modal.present();
  }

  private _getLine(routeId: string) {
    return new Promise<Line>((resolve, _) => {
      this.api.getLines('', routeId).subscribe(data => {
        const line = data[0]
        this.api.getClusters(routeId).subscribe((clusters) => {
          line.clusters = clusters
          resolve(line)
        })
      })
    })
    
  }
}
