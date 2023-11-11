import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglerComponent } from './toggler.component';

describe('TogglerComponent', () => {
  let component: TogglerComponent;
  let fixture: ComponentFixture<TogglerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TogglerComponent]
    });
    fixture = TestBed.createComponent(TogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
