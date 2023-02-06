import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedules',
        loadChildren: () => import('../schedules/schedules.module').then(m => m.SchedulesPageModule)
      },
      {
        path: 'route',
        loadChildren: () => import('../route/route.module').then(m => m.RoutePageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/schedules',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/schedules',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
