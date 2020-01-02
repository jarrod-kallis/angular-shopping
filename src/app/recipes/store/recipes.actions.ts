import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';

export const FETCH_RECIPES: string = 'FETCH_RECIPES';
export const SAVE_RECIPES: string = 'SAVE_RECIPES';
export const SET_RECIPES: string = 'SET_RECIPES';
export const DELETE_RECIPE: string = 'DELETE_RECIPE';
export const ADD_RECIPE: string = 'ADD_RECIPE';
export const ADDED_RECIPE: string = 'ADDED_RECIPE';
export const UPDATE_RECIPE: string = 'UPDATE_RECIPE';

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
}

export class SaveRecipes implements Action {
  readonly type: string = SAVE_RECIPES;
}

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;

  constructor(private _recipes: Recipe[]) { }

  public get recipes(): Recipe[] {
    return this._recipes;
  }
}

export class Route implements Action {
  readonly type: string = '';

  constructor(private _route: ActivatedRoute) { }

  public get route(): ActivatedRoute {
    return this._route;
  }
}

export class DeleteRecipe extends Route implements Action {
  readonly type: string = DELETE_RECIPE;

  constructor(private _recipeIndex: number, _route: ActivatedRoute) {
    super(_route);
  }

  public get recipeIndex(): number {
    return this._recipeIndex;
  }
}

export class AddRecipe extends Route implements Action {
  readonly type: string = ADD_RECIPE;

  constructor(private _recipe: Recipe, _route: ActivatedRoute) {
    super(_route);
  }

  public get recipe(): Recipe {
    return this._recipe;
  }
}

export class UpdateRecipe extends Route implements Action {
  readonly type: string = UPDATE_RECIPE;

  constructor(private _recipeIndex: number, private _recipe: Recipe, _route: ActivatedRoute) {
    super(_route);
  }

  public get recipeIndex(): number {
    return this._recipeIndex;
  }

  public get recipe(): Recipe {
    return this._recipe;
  }
}
