import { Action } from '@ngrx/store';

import { User } from '../../shared/models/user.model';

export const SIGNUP_START: string = "SIGNUP_START";
export const LOGIN_START: string = "LOGIN_START";
export const AUTHENTICATION_SUCCESS: string = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_FAIL: string = "AUTHENTICATION_FAIL";
export const LOGOUT: string = "LOGOUT";
export const AUTO_LOGIN: string = "AUTO_LOGIN";

export class SignUpStart implements Action {
  readonly type: string = SIGNUP_START;

  constructor(private _email: string, private _password: string) { }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;

  constructor(private _email: string, private _password: string) { }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}

export class AuthenticationSuccess implements Action {
  readonly type: string = AUTHENTICATION_SUCCESS;

  constructor(private _user: User, private _url: string = "") { }

  public get user(): User {
    return this._user;
  }

  public get url(): string {
    return this._url;
  }
}

export class AuthenticationFail implements Action {
  readonly type: string = AUTHENTICATION_FAIL;

  constructor(private _errorMessage: string) { }

  public get errorMessage(): string {
    return this._errorMessage;
  }
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
}

export type AuthenticationActions = SignUpStart | LoginStart | AuthenticationSuccess | AuthenticationFail | Logout;
