import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shared/services/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

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

  selectedIngredientSubscription: Subscription;
  ingredientsChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.clearForm();

    this.selectedIngredientSubscription = this.shoppingListService.onIngredientSelectedEvent.subscribe(
      (ingredient: Ingredient) => {
        this.selectedIngredient = ingredient;
        this.editMode = true;
      }
    );

    this.ingredientsChangedSubscription = this.shoppingListService.onIngredientsChangedEvent.subscribe(
      (ingredients: Ingredient[]) => {
        this.clearForm();
      }
    );
  }

  ngOnDestroy() {
    this.selectedIngredientSubscription.unsubscribe();
    this.ingredientsChangedSubscription.unsubscribe();
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
      this.shoppingListService.updateIngredient(
        this.selectedIngredient,
        new Ingredient(value.name, value.amount)
      );
    } else {
      this.shoppingListService.addIngredients([
        new Ingredient(value.name, value.amount)
      ]);
    }
  }

  clearForm() {
    this.selectedIngredient = new Ingredient("", 0);
    this.editMode = false;
    this.shoppingListForm.reset({ amount: 0 });
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIngredient);
  }

  getIngredientAmountPattern() {
    return Ingredient.INGREGIENT_AMOUNT_PATTERN;
  }
}
