import { Component, OnInit, Input } from "@angular/core";

import { Recipe } from "../../recipe.model";
import { RecipeService } from "src/app/shared/services/recipe.service";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  // @Output() onRecipeSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  onSelectRecipe() {
    // this.onRecipeSelected.emit(this.recipe);
    this.recipeService.onRecipeSelected(this.recipe);
  }
}
