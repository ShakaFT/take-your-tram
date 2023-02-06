import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRouteClustersComponent } from './search-route-clusters.component';

const routes: Routes = [
  {
    path: '',
    component: SearchRouteClustersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRouteClustersRoutingModule {}
