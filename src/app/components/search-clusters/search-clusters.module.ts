import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchClustersRoutingModule } from './search-clusters-routing.module';
import { SearchClustersComponent } from './search-clusters.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchClustersRoutingModule
  ],
  declarations: [SearchClustersComponent]
})
export class SearchClustersModule {}
