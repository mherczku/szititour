import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../services/AuthService";
import {selectIsLoggedIn, selectLoggedInTeam} from "../../../store/selectors/auth.selector";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  isLoggedIn = this.store.select(selectIsLoggedIn);
  team = this.store.select(selectLoggedInTeam);
  isMobileMenuOpen = false;

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit(): void {

  }

  changeIsMobileMenuOpen(event: boolean) {
    if(event) {
      document.body.style.overflow = "hidden";
      window.scroll(0, 0);
    }
    else {
      document.body.style.overflow = "auto";
    }
    this.isMobileMenuOpen = event;
  }

  logout() {
    this.authService.logout();
  }

}
