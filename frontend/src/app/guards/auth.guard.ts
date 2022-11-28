import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
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

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivateChild {
  readonly mustBeLoggedIn = [
    'admin',
    'admin-place/:id',
    'profile',
    'upload'
  ]

  readonly mustBeLoggedOut = [
    'login',
    'register'
  ]

  readonly mustBeLoggedInStates = [
    '/admin',
    '/admin-place/:id',
    '/profile',
    '/upload'
  ]

  readonly mustBeLoggedOutStates = [
    '/login',
    '/register'
  ]

  private loggedIn!: boolean

  public constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.store.subscribe((state: { auth: AuthState }) => {
      this.loggedIn = state.auth.isLoggedIn
    })
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url: string = state.url

    return this.loggedIn ?
      this.mustBeLoggedOutStates.indexOf(url) === -1 ? true : this.router.navigate(['/admin']) :
      this.mustBeLoggedInStates.indexOf(url) === -1 ? true : this.router.navigate(['/login'])
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url: string = route.path ? route.path : 'none';

    return this.loggedIn ?
      this.mustBeLoggedOut.indexOf(url) === -1 ? true : this.router.navigate(['/admin']) :
      this.mustBeLoggedIn.indexOf(url) === -1 ? true : this.router.navigate(['/login'])
  }
}
