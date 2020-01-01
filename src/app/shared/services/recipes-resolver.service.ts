import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store, Action } from '@ngrx/store';
import { switchMap, take, map } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from "../../recipes/recipe.model";
// import { DataStorageService } from "./data-storage.service";
// import { RecipeService } from "./recipe.service";
import { AppState } from '../../store/app.reducer';
import { State } from '../../recipes/store/recipes.reducer';
import { FetchRecipes, SET_RECIPES, SetRecipes } from '../../recipes/store/recipes.actions';

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Observable<Action | Recipe[]>> {// Actions | Recipe[]> /* Resolve<Recipe[]> */ {
  constructor(
    // private dataStorageService: DataStorageService,
    // private recipeService: RecipeService,
    private store: Store<AppState>,
    private actions$: Actions
  ) { }

  // The resolve method waits for the observable to complete before loading the route
  resolve(): Observable<Action | Recipe[]> { // Observable<Recipe[]> | Recipe[] {
    console.log('RecipesResolverService.resolve');
    // const recipes: Recipe[] = this.recipeService.getRecipes();

    // if (recipes.length === 0) {
    //   return this.dataStorageService.getRecipes();
    // } else {
    //   return recipes;
    // }

    const result: Observable<Action | Recipe[]> = this.store.select('recipes')
      .pipe(
        take(1),
        map((recipesState: State) => recipesState.recipes),
        switchMap((recipes: Recipe[]) => {
          if (recipes.length === 0) {
            this.store.dispatch(new FetchRecipes());
            return this.actions$
              .pipe(
                ofType(SET_RECIPES),
                take(1)
              );
          } else {
            return of(recipes);
          }
        })
      )

    return result;
  }
}
