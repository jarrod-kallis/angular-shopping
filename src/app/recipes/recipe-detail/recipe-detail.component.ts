import { Component, OnInit, Input } from "@angular/core";
import { Store } from '@ngrx/store';

import { Recipe } from "../recipe.model";
// import { ShoppingListService } from "../../shared/services/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../../shared/services/recipe.service";
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { AppState } from '../../store/app.reducer';

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
    // private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIdx = +params["id"];

      this.recipe = this.recipeService.getRecipe(this.recipeIdx);
    });
  }

  addToShoppingList = () => {
    // this.shoppingListService.addIngredients(this.recipe.ingredients.slice());
    this.store.dispatch(new AddIngredients(this.recipe.ingredients.slice()));
  };

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIdx);
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
