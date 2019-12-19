import { OnInit } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../ingredient.model";

export class ShoppingListService implements OnInit {
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  public onIngredientsChangedEvent = new Subject<Ingredient[]>();

  ngOnInit() {}

  public getIngredients() {
    return this.ingredients.slice();
  }

  public addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    this.ingredients = this.ingredients.concat(ingredients);
    this.onIngredientsChangedEvent.next(this.getIngredients());
  }
}
