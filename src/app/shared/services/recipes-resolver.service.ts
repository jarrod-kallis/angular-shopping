import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { Recipe } from "../../recipes/recipe.model";
import { DataStorageService } from "./data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  Observable<Recipe[]> | Recipe[] {
    const recipes: Recipe[] = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.getRecipes();
    } else {
      return recipes;
    }
  }
}
