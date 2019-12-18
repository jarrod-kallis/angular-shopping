import { Component, OnInit } from "@angular/core";

import { RecipeService } from "../shared/services/recipe.service";
// import { Recipe } from "./recipe.model";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  // recipe: Recipe;
  // selectedRecipe: Recipe;

  // constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    // this.recipeService.onRecipeSelectedEvent.subscribe(
    //   (selectedRecipe: Recipe) => (this.selectedRecipe = selectedRecipe)
    // );
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipe = recipe;
  // }
}
