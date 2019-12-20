import { Component, OnInit, Input } from "@angular/core";

import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shared/services/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../../shared/services/recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  recipeIdx: number;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIdx = +params["id"];

      this.recipe = this.recipeService.getRecipe(this.recipeIdx);
    });
  }

  addToShoppingList = () => {
    this.shoppingListService.addIngredients(this.recipe.ingredients.slice());
  };

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIdx);
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
