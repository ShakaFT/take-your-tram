import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchRouteClustersRoutingModule as SearchRouteClustersRoutingModule } from './search-route-clusters-routing.module';
import { SearchRouteClustersComponent } from './search-route-clusters.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchRouteClustersRoutingModule
  ],
  declarations: [SearchRouteClustersComponent]
})
export class SearchRouteClustersModule {}
