import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENTS: string = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT: string = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT: string = 'DELETE_INGREDIENT';
export const SELECT_INGREDIENT: string = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT: string = 'UNSELECT_INGREDIENT';

export class SelectIngredient implements Action {
  readonly type: string = SELECT_INGREDIENT;

  constructor(private _ingredient: Ingredient) { }

  public get ingredient(): Ingredient {
    return this._ingredient;
  }
}

export class UnselectIngredient implements Action {
  readonly type: string = UNSELECT_INGREDIENT;
}

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;

  constructor(private _ingredients: Ingredient[]) { }

  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }
}

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;

  constructor(private _updatedIngredient: Ingredient) { }

  public get updatedIngredient(): Ingredient {
    return this._updatedIngredient;
  }
}

export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;
}

export type ShoppingListActions = SelectIngredient | UnselectIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;
