import { Component, OnInit } from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthState} from "../../types/states/auth-state";
import {AuthService} from "../../services/AuthService";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;
  title = "Szititour";
  isMobileMenuOpen = false;

  constructor(private store: Store<{auth: AuthState}>, private authService: AuthService) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.isLoggedIn = state.auth.isLoggedIn;
      this.isAdmin = state.auth.team? state.auth.team.role === "ROLE_ADMIN" : false;
      this.title = this.isAdmin ? "Szititour Admin" : "Szititour";
    });
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
