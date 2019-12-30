import { User } from '../../shared/models/user.model'
import {
  AuthenticationActions, LOGIN_START, SIGNUP_START, LOGOUT,
  AUTHENTICATION_SUCCESS, AuthenticationSuccess, AUTHENTICATION_FAIL, AuthenticationFail
} from './authentication.actions'

export interface State {
  user: User;
  errorMessage: string;
  isBusy: boolean;
}

const initialState: State = {
  user: null,
  errorMessage: null,
  isBusy: false
}

export default (state: State = initialState, action: AuthenticationActions) => {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        errorMessage: null,
        isBusy: true
      }
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: (<AuthenticationSuccess>action).user,
        errorMessage: null,
        isBusy: false
      }
    case AUTHENTICATION_FAIL:
      return {
        ...state,
        user: null,
        errorMessage: (<AuthenticationFail>action).errorMessage,
        isBusy: false
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        errorMessage: null,
        isBusy: false
      }
    default:
      return state;
  }
}
