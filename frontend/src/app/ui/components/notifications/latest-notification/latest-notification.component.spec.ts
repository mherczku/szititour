import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNotificationComponent } from './latest-notification.component';

describe('LatestNotificationComponent', () => {
  let component: LatestNotificationComponent;
  let fixture: ComponentFixture<LatestNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LatestNotificationComponent]
    });
    fixture = TestBed.createComponent(LatestNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
