import { Action } from '@ngrx/store';

import { User } from '../../shared/models/user.model';

export const LOGIN_START: string = "LOGIN_START";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAIL: string = "LOGIN_FAIL";
export const LOGOUT: string = "LOGOUT";

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

export class LoginSuccess implements Action {
  readonly type: string = LOGIN_SUCCESS;

  constructor(private _user: User) { }

  public get user(): User {
    return this._user;
  }
}

export class LoginFail implements Action {
  readonly type: string = LOGIN_FAIL;

  constructor(private _errorMessage: string) { }

  public get errorMessage(): string {
    return this._errorMessage;
  }
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export type AuthenticationActions = LoginStart | LoginSuccess | LoginFail | Logout;
