import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserGameCardComponent } from "./user-game-card.component";

describe("UserGameCardComponent", () => {
  let component: UserGameCardComponent;
  let fixture: ComponentFixture<UserGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGameCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
