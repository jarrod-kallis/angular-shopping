import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LOGIN_START, LoginStart, LoginSuccess, LOGIN_SUCCESS, LoginFail } from './authentication.actions';
import { environment } from '../../../environments/environment';
import { AuthenticationResponse } from '../../shared/models/authentication-response.model';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

// Effects are like Redux Thunk in the React world (Handle async/sync side effects)
@Injectable()
export class AuthenticationEffects {
  public static LOGIN_URL: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey;

  // Annotation necessary so that ngRx picks up this property as an effect to handle and subscribe to
  // Like a reducer all actions pass through here
  @Effect()
  authenticationLoginStart = this.actions$
    .pipe(
      // Only react to the LOGIN_START action
      ofType(LOGIN_START),
      // Create a new observable, by using another observable's data
      switchMap((loginStart: LoginStart) => {
        return this.http.post<AuthenticationResponse>(AuthenticationEffects.LOGIN_URL, {
          email: loginStart.email,
          password: loginStart.password,
          returnSecureToken: true
        })
          // We need to pipe on this inner observable to catch any errors thrown,
          // because if errors propogate to the upper observable it will kill it and will never listen to another LOGIN_START action again
          .pipe(
            map((response: AuthenticationResponse) => {
              console.log(response);
              const user: User = new User(response.localId, response.email, response.idToken, +response.expiresIn);

              // map automatically wraps what you return into an observable
              // Not necessary to dispatch the action as effects will do it for us
              return new LoginSuccess(user);
            }),
            // If the http call throws an error we will catch it here and now need to return a non-error response to the upper observable, otherwise it will die
            catchError(errorResponse => {
              console.error(errorResponse);

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
              return of(new LoginFail(errorMessage));
            })
          )
      })
    );

  // Let ngRx know that this is an effect that doesn't yield a dispatchable action
  @Effect({ dispatch: false })
  authenticationLoginSuccess = this.actions$
    .pipe(
      ofType(LOGIN_SUCCESS),
      tap(() => {
        this.router.navigate(['recipes']);
      })
    )

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
}
