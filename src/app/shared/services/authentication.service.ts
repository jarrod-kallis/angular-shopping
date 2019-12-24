import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthenticationResponse } from '../models/authentication-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static SIGNUP_URL: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey;
  private static LOGIN_URL: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey;

  // BehaviorSubject: Works the same as a Subject except that you can subscribe after the values have been emitted and still get them.
  currentUserChangedEvent = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string): Observable<AuthenticationResponse> {
    return this.exhanceSignUpAndLogin(this.http.post<AuthenticationResponse>(AuthenticationService.SIGNUP_URL, { email, password, returnSecureToken: true }));
  }

  login(email: string, password: string): Observable<AuthenticationResponse> {
    let result: Observable<AuthenticationResponse> = this.http.post<AuthenticationResponse>(AuthenticationService.LOGIN_URL, { email, password, returnSecureToken: true })

    result = this.exhanceSignUpAndLogin(result);

    return result;
  }

  autoLogin() {
    const localStorageUser: string = localStorage.getItem(environment.projectStorageUserKey);

    if (localStorageUser) {
      const user: User = User.convertFromLocalStorage(localStorageUser);
      this.currentUserChangedEvent.next(user.hasValidToken() ? user : null);
    }
  }

  logout() {
    this.currentUserChangedEvent.next(null);
    this.router.navigate(["login"]);
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
