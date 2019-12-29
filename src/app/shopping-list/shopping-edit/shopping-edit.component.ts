import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from '@ngrx/store';

import { Ingredient } from "../../shared/ingredient.model";
// import { ShoppingListService } from "../../shared/services/shopping-list.service";
import { AddIngredients, UpdateIngredient, DeleteIngredient, UnselectIngredient } from '../store/shopping-list.actions';
import { State as ShoppingListState } from '../store/shopping-list.reducer';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput") nameInputRef: ElementRef;
  // @ViewChild("amountInput") amountInputRef: ElementRef;

  // @Output() onIngredientAdded = new EventEmitter<Ingredient>();

  @ViewChild("shoppingListForm") shoppingListForm: NgForm;
  selectedIngredient: Ingredient;
  editMode: boolean = false;

  // selectedIngredientSubscription: Subscription;
  // ingredientsChangedSubscription: Subscription;
  shoppingListStoreSubscription: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.clearForm();

    // this.selectedIngredientSubscription = this.shoppingListService.onIngredientSelectedEvent.subscribe(
    //   (ingredient: Ingredient) => {
    //     this.selectedIngredient = ingredient;
    //     this.editMode = true;
    //   }
    // );

    this.shoppingListStoreSubscription = this.store.select('shoppingList').subscribe((state: ShoppingListState) => {
      this.selectedIngredient = state.selectedIngredient;
      this.editMode = state.selectedIngredientIndex > -1;
    });

    // this.ingredientsChangedSubscription = this.shoppingListService.onIngredientsChangedEvent.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.clearForm();
    //   }
    // );
  }

  ngOnDestroy() {
    // this.selectedIngredientSubscription.unsubscribe();
    // this.ingredientsChangedSubscription.unsubscribe();
    this.shoppingListStoreSubscription.unsubscribe();

    this.clearForm();
  }

  // onAddIngredient() {
  //   // this.onIngredientAdded.emit(
  //   //   new Ingredient(
  //   //     this.nameInputRef.nativeElement.value,
  //   //     this.amountInputRef.nativeElement.value
  //   //   )
  //   // );
  //   this.shoppingListService.addIngredients([
  //     new Ingredient(
  //       this.nameInputRef.nativeElement.value,
  //       this.amountInputRef.nativeElement.value
  //     )
  //   ]);
  // }

  onSubmit() {
    const value = this.shoppingListForm.value;

    if (this.editMode === true) {
      // this.shoppingListService.updateIngredient(
      //   this.selectedIngredient,
      //   new Ingredient(value.name, value.amount)
      // );
      this.store.dispatch(new UpdateIngredient(
        new Ingredient(value.name, value.amount)
      ));
    } else {
      // this.shoppingListService.addIngredients([
      //   new Ingredient(value.name, value.amount)
      // ]);
      this.store.dispatch(new AddIngredients([
        new Ingredient(value.name, value.amount)
      ]));
    }
    this.clearForm();
  }

  clearForm() {
    // this.selectedIngredient = new Ingredient("", 0);
    this.editMode = false;
    this.shoppingListForm.reset({ amount: 0 });

    this.store.dispatch(new UnselectIngredient());
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.selectedIngredient);
    this.store.dispatch(new DeleteIngredient());
    this.clearForm();
  }

  getIngredientAmountPattern() {
    return Ingredient.INGREGIENT_AMOUNT_PATTERN;
  }
}
