import { Component } from '@angular/core';
import * as L from 'leaflet'
import { ApiService } from 'src/services/api.service';
import { TransportsNetworkService } from 'src/services/transports-network.service';
import { LINES_TYPES } from '../constants';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {

  map: L.Map | undefined;
  linesTypes = LINES_TYPES
  linesTypesDisplayed: string[] = []
  linesTypesPolyline: Map<string, Map<string, L.Polyline>> = new Map<string,  Map<string, L.Polyline>>()
  linesCoordinates: Map<string, Map<string, any>[]> = new Map<string, Map<string, any>[]>()

  constructor(private api: ApiService, private transportNetwork: TransportsNetworkService) { }

  ionViewDidEnter() {
    if (!this.map) {
      this.map = L.map('mapid').setView([45.192655, 5.718039], 30)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  }

  async ngOnInit() {
    await this.loadCoordinate()
  }

  onClickChip(linesType: string) {
    const index = this.linesTypesDisplayed.indexOf(linesType)
    if (index === -1) {
      this.linesTypesDisplayed.push(linesType)
      this.displayFromType(linesType)
    } else {
      this.linesTypesDisplayed.splice(index, 1)
      this.unDisplayFromType(linesType)
    }
  }

  displayFromType(linesType: string) {
    let linesPolyline: Map<string, L.Polyline> = new Map<string, L.Polyline>()
    this.linesCoordinates.get(linesType)?.forEach(linesTypeCoordinates => {
      const polyline = L.polyline(linesTypeCoordinates.get('coordinates'), { color: `#${linesTypeCoordinates.get('color')}`, weight: 6 })
      this.map?.addLayer(polyline)
      linesPolyline.set(linesTypeCoordinates.get('id'), polyline)
    })
    this.linesTypesPolyline.set(linesType, linesPolyline)
  }

  unDisplayFromType(linesType: string) {
    this.linesTypesPolyline.get(linesType)?.forEach(polyline => {
      this.map?.removeLayer(polyline)
    })
    this.linesTypesPolyline.delete(linesType)
  }

  async loadCoordinate() {

    return new Promise<void>((resolve, _) => {
      this.linesTypes.forEach((linesType, linesTypeIndex) => {
        let linesTypeCoordinates: Map<string, any>[] = []
        const lines = this.transportNetwork.getTransportData().get(linesType)!
        lines.forEach((line, lineIndex) => {
          this.api.getPolylineJsonFromLine(line.id).subscribe(data => {
            let lineCoordinates: Map<string, any> = new Map<string, any>()
            let lineCoordinatesMatrix: number[][] = []
            lineCoordinates.set('id', line.id)
            lineCoordinates.set('color', line.color)
            data["features"][0]["geometry"]["coordinates"][0].forEach((coordinate: number[]) => {
              lineCoordinatesMatrix.push(coordinate.reverse())
            })
            lineCoordinates.set('coordinates', lineCoordinatesMatrix)
            linesTypeCoordinates.push(lineCoordinates)

            if (linesTypeIndex === this.linesTypes.length - 1 && lineIndex === lines.length - 1) {
              resolve()
            }

          })
        })
        this.linesCoordinates.set(linesType, linesTypeCoordinates)
      })
    })
  }

}


