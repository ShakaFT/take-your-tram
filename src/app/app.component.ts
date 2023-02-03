import { Component } from '@angular/core';
import { TagLines } from 'src/interfaces/TagLines';
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
    LINES_TYPES.forEach((linesType) => {
      this.api.getLines(linesType).subscribe((lines) => {
        console.log(lines)
        const tagLines: TagLines = {linesType: linesType, lines: lines}
        this.transportsNetwork.addTagLines(tagLines)

      })
    })
  }
}
