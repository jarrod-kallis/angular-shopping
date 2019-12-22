import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { RecipeService } from "./recipe.service";
import { Recipe } from "../../recipes/recipe.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  private static BASE_URL: string =
    "https://angular-shopping-21897.firebaseio.com";
  private static RECIPES_URL: string = `${DataStorageService.BASE_URL}/recipes.json`;

  constructor(private recipeService: RecipeService, private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(DataStorageService.RECIPES_URL).pipe(
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
      tap((recipes: Recipe[]) => this.recipeService.setRecipes(recipes))
    );
  }

  saveRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();

    this.http
      .put(DataStorageService.RECIPES_URL, recipes)
      .subscribe(() => this.getRecipes());
  }
}
