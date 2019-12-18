import { EventEmitter } from "@angular/core";

import { Recipe } from "../../recipes/recipe.model";
import { Ingredient } from "../ingredient.model";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "Test Recipe",
      "This is simply a test",
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?cs=srgb&dl=burrito-chicken-close-up-461198.jpg&fm=jpg",
      [new Ingredient("Meat", 1), new Ingredient("Lettuce", 5)]
    ),
    new Recipe(
      "Test Recipe2",
      "This is simply a test 2",
      "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_981,c_fill,g_auto,h_552,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170517150325-food-general.jpg",
      [new Ingredient("Rolls", 1), new Ingredient("Sausage", 2)]
    )
  ];

  // selectedRecipe: Recipe;

  onRecipeSelectedEvent = new EventEmitter<Recipe>();

  getRecipes() {
    // Create a copy of the recipes array
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.getRecipes()[id];
  }

  onRecipeSelected(recipe: Recipe) {
    // this.selectedRecipe = recipe;
    this.onRecipeSelectedEvent.emit(recipe);
  }
}
