import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchSchedulesClustersRoutingModule as SearchSchedulesClustersRoutingModule } from './search-schedules-clusters-routing.module';
import { SearchSchedulesClustersComponent } from './search-schedules-clusters.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchSchedulesClustersRoutingModule
  ],
  declarations: [SearchSchedulesClustersComponent]
})
export class SearchSchedulesClustersModule {}
