import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSchedulesClustersComponent } from './search-schedules-clusters.component';

const routes: Routes = [
  {
    path: '',
    component: SearchSchedulesClustersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchSchedulesClustersRoutingModule {}
