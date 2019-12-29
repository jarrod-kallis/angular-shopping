import { User } from '../../shared/models/user.model'
import { LOGIN, Login, LOGOUT, AuthenticationActions } from './authentication.actions'

export interface State {
  user: User;
}

const initialState: State = {
  user: null
}

export default (state: State = initialState, action: AuthenticationActions) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: (<Login>action).user
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
