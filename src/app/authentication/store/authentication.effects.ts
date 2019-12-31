import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap, filter, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  LOGIN_START, LoginStart, SIGNUP_START, SignUpStart, AUTHENTICATION_SUCCESS,
  AuthenticationSuccess, AuthenticationFail, LOGOUT, Logout, AUTO_LOGIN
} from './authentication.actions';
import { environment } from '../../../environments/environment';
import { AuthenticationResponse } from '../../shared/models/authentication-response.model';
import { User } from '../../shared/models/user.model';
import { AppState } from '../../store/app.reducer';

// Effects are like Redux Thunk in the React world (Handle async/sync side effects)
@Injectable()
export class AuthenticationEffects {
  private static SIGNUP_URL: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey;
  private static LOGIN_URL: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey;

  private logoutUserTimer: NodeJS.Timer;

  // Annotation necessary so that ngRx picks up this property as an effect to handle and subscribe to
  // Like a reducer all actions pass through here
  @Effect()
  authenticationLoginStart = this.actions$
    .pipe(
      // Only react to the LOGIN_START action
      ofType(LOGIN_START),
      // Create a new observable, by using another observable's data
      switchMap((loginStart: LoginStart) => {
        return this.exhanceSignUpAndLogin(this.http.post<AuthenticationResponse>(AuthenticationEffects.LOGIN_URL, {
          email: loginStart.email,
          password: loginStart.password,
          returnSecureToken: true
        }))
      })
    );

  @Effect()
  signUpStart = this.actions$
    .pipe(
      ofType(SIGNUP_START),
      switchMap((signUpStart: SignUpStart) => {
        return this.exhanceSignUpAndLogin(this.http.post<AuthenticationResponse>(AuthenticationEffects.SIGNUP_URL, {
          email: signUpStart.email,
          password: signUpStart.password,
          returnSecureToken: true
        }))
      })
    )

  // Let ngRx know that this is an effect that doesn't yield a dispatchable action
  @Effect({ dispatch: false })
  authenticationLoginSuccess = this.actions$
    .pipe(
      ofType(AUTHENTICATION_SUCCESS),
      map((authenticationSuccess: AuthenticationSuccess) => {
        // Set a timer to log the user out automatically
        this.logoutUserTimer = setTimeout(() => {
          this.store.dispatch(new Logout());
        }, authenticationSuccess.user.getTokenExpirationDuration());

        // console.log(authenticationSuccess.url);
        return authenticationSuccess.url;
      }),
      tap((url: string) => {
        if (url === '' || url.startsWith('/login')) {
          this.router.navigate(['recipes']);
        }
      })
    )

  @Effect({ dispatch: false })
  authenticationLogout = this.actions$
    .pipe(
      ofType(LOGOUT),
      tap(() => {
        localStorage.removeItem(environment.projectStorageUserKey);

        if (this.logoutUserTimer) {
          clearTimeout(this.logoutUserTimer);
          this.logoutUserTimer = null;
        }

        this.router.navigate(['login']);
      })
    )

  @Effect()
  autoLogin = this.actions$
    .pipe(
      ofType(AUTO_LOGIN),
      map(() => {
        // Get the current URL before trying to log in automatically, so we can stay on the URL if the user token is still valid
        this.router.events
          .pipe(
            filter((event: RouterEvent) => event instanceof NavigationStart),
            // Take the first NavigationStart event and then unsubscribe
            take(1)
          )
          .subscribe((event: NavigationStart) => {
            // this.authenticationService.autoLogin(event.url);
            const localStorageUser: string = localStorage.getItem(environment.projectStorageUserKey);

            if (localStorageUser) {
              const user: User = User.convertFromLocalStorage(localStorageUser);

              this.store.dispatch(new AuthenticationSuccess(user, event.url));
            }
          });

        // Return a dummy action, because auto login happens asynchronously after getting the current URL
        return { type: 'AUTO_LOGIN_START' };
      })
    )

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) { }

  private exhanceSignUpAndLogin(response: Observable<AuthenticationResponse>): Observable<AuthenticationSuccess | AuthenticationFail> {
    return response
      // We need to pipe on this inner observable to catch any errors thrown,
      // because if errors propogate to the upper observable it will kill it and will never listen to another LOGIN_START action again
      .pipe(
        map((response: AuthenticationResponse) => {
          const user: User = new User(response.localId, response.email, response.idToken, +response.expiresIn);

          // Store user in local storage
          localStorage.setItem(environment.projectStorageUserKey, JSON.stringify(user));

          // map automatically wraps what you return into an observable
          // Not necessary to dispatch the action as effects will do it for us
          return new AuthenticationSuccess(user);
        }),
        // If the http call throws an error we will catch it here and now need to return a non-error response to the upper observable, otherwise it will die
        catchError(errorResponse => {
          let errorMessage = errorResponse.message;

          if (errorResponse && errorResponse.error && errorResponse.error.error) {
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = "This email address is already in use";
                break;
              case 'INVALID_PASSWORD':
              case 'EMAIL_NOT_FOUND':
                errorMessage = "Invalid credentials";
                break;
            }
          }

          // of() creates a new observable (non-error observable) so that the overall observable doesn't die
          return of(new AuthenticationFail(errorMessage));
        })
      )
  }
}
