// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { map, tap } from "rxjs/operators";
// import { Observable } from "rxjs";
// import { Store } from '@ngrx/store';

// import { RecipeService } from "./recipe.service";
// import { Recipe } from "../../recipes/recipe.model";
// import { AppState } from '../../store/app.reducer';
// import { SetRecipes } from '../../recipes/store/recipes.actions';
// import { State } from '../../recipes/store/recipes.reducer';

// @Injectable({
//   providedIn: "root"
// })
export class DataStorageService {
  // private static BASE_URL: string =
  //   "https://angular-shopping-21897.firebaseio.com";
  // private static RECIPES_URL: string = `${DataStorageService.BASE_URL}/recipes.json`;

  // constructor(
  //   private recipeService: RecipeService,
  //   private http: HttpClient,
  //   private store: Store<AppState>
  // ) { }

  // getRecipes(): Observable<Recipe[]> {
  //   console.log('DataStorageService.getRecipes()');
  //   return this.http.get<Recipe[]>(DataStorageService.RECIPES_URL).pipe(
  //     map((recipes: Recipe[]) => {
  //       console.log('DataStorageService.getRecipes() map');
  //       return recipes.map(
  //         recipe =>
  //           new Recipe(
  //             recipe.name,
  //             recipe.description,
  //             recipe.imagePath,
  //             recipe.ingredients || []
  //           )
  //       );
  //     }),
  //     tap((recipes: Recipe[]) => {
  //       console.log('DataStorageService.getRecipes() tap');
  //       // this.recipeService.setRecipes(recipes);
  //       this.store.dispatch(new SetRecipes(recipes));
  //     })
  //   );
  // }

  // saveRecipes() {
  //   // const recipes: Recipe[] = this.recipeService.getRecipes();

  //   // this.http
  //   //   .put(DataStorageService.RECIPES_URL, recipes)
  //   //   .subscribe(() => this.getRecipes());

  //   this.store.select('recipes')
  //     .pipe(
  //       map((recipesState: State) => recipesState.recipes),
  //       tap((recipes: Recipe[]) => {
  //         this.http
  //           .put(DataStorageService.RECIPES_URL, recipes)
  //         // .subscribe(() => this.getRecipes());
  //       })
  //     )
  // }
}
