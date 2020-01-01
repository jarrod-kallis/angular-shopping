import { Component, OnInit, Input } from "@angular/core";

import { Recipe } from "../../recipe.model";
// import { RecipeService } from "src/app/shared/services/recipe.service";
// import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() recipeIdx: number;

  // @Output() onRecipeSelected = new EventEmitter<Recipe>();

  constructor() // private recipeService: RecipeService,
  // private router: Router,
  // private route: ActivatedRoute
  { }

  ngOnInit() { }

  // onSelectRecipe() {
  //   // this.onRecipeSelected.emit(this.recipe);
  //   // this.recipeService.onRecipeSelected(this.recipe);

  //   // this.router.navigate(
  //   //   [this.recipeService.getRecipes().indexOf(this.recipe)],
  //   //   {
  //   //     relativeTo: this.route
  //   //   }
  //   // );
  // }
}
