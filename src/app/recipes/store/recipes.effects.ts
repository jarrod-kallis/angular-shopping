import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  ADD_RECIPE, FETCH_RECIPES, SetRecipes, SAVE_RECIPES,
  SaveRecipes, AddRecipe, UPDATE_RECIPE, DELETE_RECIPE, Route
} from './recipes.actions';
import { AppState } from '../../store/app.reducer';
import { State } from './recipes.reducer';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipesEffects {
  private static BASE_URL: string =
    "https://angular-shopping-21897.firebaseio.com";
  private static RECIPES_URL: string = `${RecipesEffects.BASE_URL}/recipes.json`;

  @Effect()
  fetchRecipes = this.actions$
    .pipe(
      ofType(FETCH_RECIPES),
      switchMap(() => this.http.get<Recipe[]>(RecipesEffects.RECIPES_URL)),
      map((recipes: Recipe[]) => {
        return recipes.map(
          recipe =>
            new Recipe(
              recipe.name,
              recipe.description,
              recipe.imagePath,
              recipe.ingredients || []
            )
        );
      }),
      map((recipes: Recipe[]) => {
        return new SetRecipes(recipes);
      })
    );

  @Effect({ dispatch: false })
  saveRecipes = this.actions$
    .pipe(
      ofType(SAVE_RECIPES),
      // Retrieves the last value (RecipesState) from an observable and passes it on
      withLatestFrom(this.store.select('recipes')),
      map(([saveRecipes, recipesState]: [SaveRecipes, State]) => {
        console.log(saveRecipes);
        return recipesState.recipes;
      }),
      switchMap((recipes: Recipe[]) => this.http
        .put(RecipesEffects.RECIPES_URL, recipes))
    );

  @Effect({ dispatch: false })
  recipeAdded = this.actions$
    .pipe(
      ofType(ADD_RECIPE),
      withLatestFrom(this.store.select('recipes')),
      map(([addRecipe, recipesState]: [AddRecipe, State]) => ([addRecipe.route, recipesState.recipes])),
      tap(([route, recipes]: [ActivatedRoute, Recipe[]]) => {
        this.router.navigate(["../", recipes.length - 1], { relativeTo: route });
      })
    );

  @Effect({ dispatch: false })
  recipeUpdated = this.actions$
    .pipe(
      ofType(UPDATE_RECIPE, DELETE_RECIPE),
      withLatestFrom(this.store.select('recipes')),
      map(([updateOrDeleteRecipe, recipesState]: [Route, State]) => updateOrDeleteRecipe.route),
      tap((route: ActivatedRoute) => {
        this.router.navigate(["../"], { relativeTo: route });
      })
    );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private http: HttpClient
  ) { }
}
