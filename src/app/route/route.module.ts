import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutePage } from './route.page';

import { RoutePageRoutingModule } from './route-routing.module';
import { ItinerariesModalComponent } from './modal/itineraries-modal/itineraries-modal.component';
import { DetailsModalComponent } from './modal/details-modal/details-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RoutePageRoutingModule
  ],
  declarations: [RoutePage, ItinerariesModalComponent, DetailsModalComponent]
})
export class RoutePageModule {}
