import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulesPage } from './schedules.page';

import { SchedulesPageRoutingModule } from './schedules-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SchedulesPageRoutingModule
  ],
  declarations: [SchedulesPage]
})
export class SchedulesPageModule {}
