import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {AuthState} from "../interfaces/states/auth-state";
import {Team} from "../interfaces/team";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivateChild, CanActivate {

  private team?: Team
  private currentTeamRole = ""

  public constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.store.subscribe((state: { auth: AuthState }) => {
      this.team = state.auth.team ?? undefined
      this.currentTeamRole = state.auth.team ? state.auth.team?.admin ? 'admin' : 'user' : 'guest'
      console.warn("ROLE: ", this.currentTeamRole)
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.currentTeamRole) {
      if (route.data?.['roles'] && route.data?.['roles'].indexOf(this.currentTeamRole) === -1) {
        this.currentTeamRole === "admin" ? this.router.navigate(['/admin']) : this.currentTeamRole === "user" ? this.router.navigate(['/home']) /* todo user page */ : this.router.navigate(['/login'])
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'], /*{ queryParams: { returnUrl: state.url } }*/);
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.currentTeamRole) {
      if (childRoute.data?.['roles'] && childRoute.data?.['roles'].indexOf(this.currentTeamRole) === -1) {
        this.currentTeamRole === "admin" ? this.router.navigate(['/admin']) : this.currentTeamRole === "user" ? this.router.navigate(['/home']) /* todo user page */ : this.router.navigate(['/login'])
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'], /*{ queryParams: { returnUrl: state.url } }*/);
    return false;

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.currentTeamRole) {
      // here we need to use the passed object role
      if (route.data?.['roles'] && route.data?.['roles'].indexOf(this.currentTeamRole) === -1) {
        // role not authorised so redirect to home page
        this.currentTeamRole === "admin" ? this.router.navigate(['/admin']) : this.currentTeamRole === "user" ? this.router.navigate(['/home']) /* todo user page */ : this.router.navigate(['/login'])
        return false;
      }
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], /*{ queryParams: { returnUrl: state.url } }*/)
    return false;
  }
}
