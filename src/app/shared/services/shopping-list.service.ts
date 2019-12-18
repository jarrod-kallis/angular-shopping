import { OnInit, EventEmitter } from "@angular/core";

import { Ingredient } from "../ingredient.model";

export class ShoppingListService implements OnInit {
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  public onIngredientsChangedEvent = new EventEmitter<Ingredient[]>();

  ngOnInit() {}

  public getIngredients() {
    return this.ingredients.slice();
  }

  public addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    this.ingredients = this.ingredients.concat(ingredients);
    this.onIngredientsChangedEvent.emit(this.getIngredients());
  }
}
