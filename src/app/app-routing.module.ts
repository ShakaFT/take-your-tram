import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./route/search-route-clusters/search-route-clusters.module').then(m => m.SearchRouteClustersModule)
  },
  {
    path: 'search-schedules',
    loadChildren: () => import('./schedules/search-schedules-clusters/search-schedules-clusters.module').then(m => m.SearchSchedulesClustersModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
