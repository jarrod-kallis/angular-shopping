import { Action } from '@ngrx/store';

import { User } from '../../shared/models/user.model';

export const LOGIN: string = "LOGIN";
export const LOGOUT: string = "LOGOUT";

export class Login implements Action {
  readonly type: string = LOGIN;

  constructor(private _user: User) { }

  public get user(): User {
    return this._user;
  }
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export type AuthenticationActions = Login | Logout;
