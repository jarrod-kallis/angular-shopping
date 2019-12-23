import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { AuthenticationResponse } from '../models/authentication-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static API_KEY: string = "AIzaSyDi1YBComW1RMSSyx9ye8vIMB2I6iZ9iAU";
  private static SIGNUP_URL: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + AuthenticationService.API_KEY;
  private static LOGIN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + AuthenticationService.API_KEY;

  // BehaviorSubject: Works the same as a Subject except that you can subscribe after the values have been emitted and still get them.
  currentUserChangedEvent = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthenticationResponse> {
    return this.exhanceSignUpAndLogin(this.http.post<AuthenticationResponse>(AuthenticationService.SIGNUP_URL, { email, password, returnSecureToken: true }));
  }

  login(email: string, password: string): Observable<AuthenticationResponse> {
    let result: Observable<AuthenticationResponse> = this.http.post<AuthenticationResponse>(AuthenticationService.LOGIN_URL, { email, password, returnSecureToken: true })

    result = this.exhanceSignUpAndLogin(result);

    return result;
  }

  logout() {
    this.currentUserChangedEvent.next(null);
  }

  private exhanceSignUpAndLogin(response: Observable<AuthenticationResponse>): Observable<AuthenticationResponse> {
    return response
      .pipe(
        map(response => new AuthenticationResponse(response)),
        tap((response: AuthenticationResponse) => {
          const user: User = new User(response.localId, response.email, response.idToken, +response.expiresIn);
          this.currentUserChangedEvent.next(user);
        }),
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

          return throwError(errorMessage);
        })
      );
  }
}
