import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchClustersComponent } from './search-clusters.component';

const routes: Routes = [
  {
    path: '',
    component: SearchClustersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchClustersRoutingModule {}
