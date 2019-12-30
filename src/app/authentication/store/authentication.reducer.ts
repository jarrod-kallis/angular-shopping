import { User } from '../../shared/models/user.model'
import { LOGIN_SUCCESS, LoginSuccess, LOGOUT, AuthenticationActions, LOGIN_START, LOGIN_FAIL, LoginFail } from './authentication.actions'

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
      return {
        ...state,
        errorMessage: null,
        isBusy: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: (<LoginSuccess>action).user,
        errorMessage: null,
        isBusy: false
      }
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        errorMessage: (<LoginFail>action).errorMessage,
        isBusy: false
      }
    case LOGOUT:
      return {
        ...state,
        user: initialState.user
      }
    default:
      return state;
  }
}
