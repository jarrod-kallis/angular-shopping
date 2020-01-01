import { Action } from '@ngrx/store';

import { SET_RECIPES, SetRecipes, DELETE_RECIPE, DeleteRecipe, AddRecipe, ADD_RECIPE, UPDATE_RECIPE, UpdateRecipe } from './recipes.actions'
import { Recipe } from '../recipe.model';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: (<SetRecipes>action).recipes
      }
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe: Recipe, idx: number) => idx !== (<DeleteRecipe>action).recipeIndex)
      }
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, (<AddRecipe>action).recipe]
      }
    case UPDATE_RECIPE:
      const updateRecipeAction: UpdateRecipe = action as UpdateRecipe;

      return {
        ...state,
        recipes: state.recipes.map((recipe: Recipe, idx: number) =>
          idx !== updateRecipeAction.recipeIndex ? recipe : updateRecipeAction.recipe
        )
      }
    default:
      return state;
  }
}
