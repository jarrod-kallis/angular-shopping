import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
// import { ShoppingListService } from "../shared/services/shopping-list.service";
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { SelectIngredient } from './store/shopping-list.actions';

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  // private ingredientsChangedSubscription: Subscription;

  ingredientsObservable: Observable<{ ingredients: Ingredient[] }>

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.ingredientsObservable = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();

    // this.ingredientsChangedSubscription = this.shoppingListService.onIngredientsChangedEvent.subscribe(
    //   (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    // );
  }

  ngOnDestroy() {
    // this.ingredientsChangedSubscription.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //    this.ingredients.push(ingredient);
  // }

  onSelect(ingredient: Ingredient) {
    // this.shoppingListService.selectIngredient(ingredient);
    this.store.dispatch(new SelectIngredient(ingredient));
  }
}
