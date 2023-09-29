import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLoaderComponent } from './container-loader.component';

describe('ContainerLoaderComponent', () => {
  let component: ContainerLoaderComponent;
  let fixture: ComponentFixture<ContainerLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContainerLoaderComponent]
    });
    fixture = TestBed.createComponent(ContainerLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
