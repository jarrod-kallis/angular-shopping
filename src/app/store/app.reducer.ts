import { ActionReducerMap } from '@ngrx/store';

import shoppingListReducer, { State as ShoppingListState } from '../shopping-list/store/shopping-list.reducer';
import authenticationReducer, { State as AuthenticationState } from '../authentication/store/authentication.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  authentication: AuthenticationState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  authentication: authenticationReducer
};
