import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot, CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectLoggedInTeam} from "../store/selectors/auth.selector";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad, CanActivateChild, CanActivate {

  private team = this.store.select(selectLoggedInTeam);
  private currentTeamRole: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_GUEST" = "ROLE_GUEST";

  public constructor(
    private store: Store,
    private router: Router
  ) {
    this.team.subscribe((team ) => {
      this.currentTeamRole = team? team?.role : "ROLE_GUEST";
      console.warn("ROLE: ", this.currentTeamRole);
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.currentTeamRole) {
      if (route.data?.["roles"] && route.data?.["roles"].indexOf(this.currentTeamRole) === -1) {
        this.currentTeamRole === "ROLE_ADMIN" ? this.router.navigate(["/admin"]) : this.currentTeamRole === "ROLE_USER" ? this.router.navigate(["/home"]) /* todo user page */ : this.router.navigate(["/login"]);
        return false;
      }
      return true;
    }
    this.router.navigate(["/login"], /*{ queryParams: { returnUrl: state.url } }*/);
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.currentTeamRole) {
      if (childRoute.data?.["roles"] && childRoute.data?.["roles"].indexOf(this.currentTeamRole) === -1) {
        this.currentTeamRole === "ROLE_ADMIN" ? this.router.navigate(["/admin"]) : this.currentTeamRole === "ROLE_USER" ? this.router.navigate(["/home"]) /* todo user page */ : this.router.navigate(["/login"]);
        return false;
      }
      return true;
    }
    this.router.navigate(["/login"], /*{ queryParams: { returnUrl: state.url } }*/);
    return false;

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.currentTeamRole) {
      // here we need to use the passed object role
      if (route.data?.["roles"] && route.data?.["roles"].indexOf(this.currentTeamRole) === -1) {
        // role not authorised so redirect to home page
        this.currentTeamRole === "ROLE_ADMIN" ? this.router.navigate(["/admin"]) : this.currentTeamRole === "ROLE_USER" ? this.router.navigate(["/home"]) /* todo user page */ : this.router.navigate(["/login"]);
        return false;
      }
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], /*{ queryParams: { returnUrl: state.url } }*/);
    return false;
  }
}
