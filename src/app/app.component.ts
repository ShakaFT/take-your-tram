import { Component } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';
import { LINES_TYPES } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private api: ApiService, private transportsNetwork: TransportsNetworkService) {}

  ngOnInit() {
    this._loadData()
  }

  private _loadData() {
    LINES_TYPES.forEach((typeLines) => {
      this.api.getLines(typeLines).subscribe((lines) => {
        lines.forEach((line) => {
          this.api.getClusters(line.id).subscribe((clusters) => {
            line.clusters = clusters
            this.transportsNetwork.addClusters(clusters)
          })
        })
        this.transportsNetwork.addLines(typeLines, lines)
      })
    })
  }
}
