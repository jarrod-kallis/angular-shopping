import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../../shared/services/recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const recipeIdx: number = +params["id"];

      if (isNaN(recipeIdx)) {
        this.recipe = new Recipe("", "", "", []);
      } else {
        this.recipe = this.recipeService.getRecipe(+params["id"]);
      }
    });
  }
}
