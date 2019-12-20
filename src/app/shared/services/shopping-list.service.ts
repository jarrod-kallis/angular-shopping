import { OnInit } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../ingredient.model";

export class ShoppingListService implements OnInit {
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  public onIngredientsChangedEvent = new Subject<Ingredient[]>();
  public onIngredientSelectedEvent = new Subject<Ingredient>();

  ngOnInit() {}

  public getIngredients() {
    return this.ingredients.slice();
  }

  public addIngredients(ingredients: Ingredient[]) {
    const currentIngredients: Ingredient[] = this.getIngredients();

    ingredients.forEach((ingredient: Ingredient) => {
      const foundIngredient: Ingredient = currentIngredients.find(
        (currentIngredient: Ingredient) =>
          currentIngredient.name === ingredient.name
      );

      if (foundIngredient) {
        currentIngredients[
          currentIngredients.indexOf(foundIngredient)
        ] = new Ingredient(
          ingredient.name,
          foundIngredient.amount + ingredient.amount
        );
      } else {
        currentIngredients.push(ingredient);
      }
    });

    this.ingredients = currentIngredients;

    // this.ingredients.push(...ingredients);
    // this.ingredients = this.ingredients.concat(ingredients);
    this.onIngredientsChangedEvent.next(this.getIngredients());
  }

  public selectIngredient(ingredient: Ingredient) {
    this.onIngredientSelectedEvent.next(ingredient);
  }

  public updateIngredient(
    originalIngredient: Ingredient,
    updatedIngredient: Ingredient
  ) {
    const ingredients: Ingredient[] = this.getIngredients();
    const ingredientIdx: number = ingredients.indexOf(originalIngredient);

    if (ingredientIdx > -1) {
      ingredients[ingredientIdx] = updatedIngredient;
      this.ingredients = ingredients;

      this.onIngredientsChangedEvent.next(this.getIngredients());
    }
  }

  public deleteIngredient(ingredient: Ingredient) {
    const ingredients: Ingredient[] = this.getIngredients();
    const ingredientIdx: number = ingredients.indexOf(ingredient);

    if (ingredientIdx > -1) {
      this.ingredients = ingredients.filter(
        filterIngredient => filterIngredient !== ingredient
      );

      this.onIngredientsChangedEvent.next(this.getIngredients());
    }
  }
}
