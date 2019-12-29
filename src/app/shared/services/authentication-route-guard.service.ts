import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user.model';
import { AppState } from '../../store/app.reducer';
import { State } from '../../authentication/store/authentication.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRouteGuardService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authenticationService.currentUserChangedEvent
    return this.store.select('authentication')
      .pipe(
        take(1),
        map((authenticationState: State) => authenticationState.user),
        map((user: User) => {
          if (user && user.hasValidToken()) {
            return true;
          } else {
            return this.router.createUrlTree(["login"]);
          }
        })
      )
  }
}
