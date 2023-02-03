import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutePage } from './route.page';

import { RoutePageRoutingModule } from './route-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RoutePageRoutingModule
  ],
  declarations: [RoutePage]
})
export class RoutePageModule {}
