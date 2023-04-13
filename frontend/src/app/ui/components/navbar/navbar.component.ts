import { Component, OnInit } from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../store/states/auth-state";
import {AuthService} from "../../../services/AuthService";
import {selectIsLoggedIn, selectLoggedInTeam} from "../../../store/selectors/auth.selector";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {

  isLoggedIn = this.store.select(selectIsLoggedIn);
  team = this.store.select(selectLoggedInTeam);
  //title = "Szititour";
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
