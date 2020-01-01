import { ActionReducerMap } from '@ngrx/store';

import shoppingListReducer, { State as ShoppingListState } from '../shopping-list/store/shopping-list.reducer';
import authenticationReducer, { State as AuthenticationState } from '../authentication/store/authentication.reducer';
import recipesReducer, { State as RecipesState } from '../recipes/store/recipes.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  authentication: AuthenticationState;
  recipes: RecipesState
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  authentication: authenticationReducer,
  recipes: recipesReducer
};
