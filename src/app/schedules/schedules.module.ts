import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulesPage } from './schedules.page';

import { SchedulesPageRoutingModule } from './schedules-routing.module';
import { ClustersModalComponent } from './modal/clusters-modal/clusters-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SchedulesPageRoutingModule
  ],
  declarations: [SchedulesPage, ClustersModalComponent]
})
export class SchedulesPageModule {}
