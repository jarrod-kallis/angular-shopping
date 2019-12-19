import { Component, OnInit, OnDestroy } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shared/services/shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientsChangedSubscription = this.shoppingListService.onIngredientsChangedEvent.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //    this.ingredients.push(ingredient);
  // }

  onSelect(ingredient: Ingredient) {
    this.shoppingListService.selectIngredient(ingredient);
  }
}
