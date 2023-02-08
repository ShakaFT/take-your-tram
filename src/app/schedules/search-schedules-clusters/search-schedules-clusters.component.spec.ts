import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchSchedulesClustersComponent } from './search-schedules-clusters.component';

describe('SearchSchedulesClustersComponent', () => {
  let component: SearchSchedulesClustersComponent;
  let fixture: ComponentFixture<SearchSchedulesClustersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSchedulesClustersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSchedulesClustersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
