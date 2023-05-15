import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {Store} from "@ngrx/store";
import {selectLoggedInTeam} from "../../../../store/selectors/auth.selector";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {

  teamProfile$ = this.store.select(selectLoggedInTeam);

  constructor(private store: Store) {
  }

}
