import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recipe } from "../recipe.model";
// import { RecipeService } from "../../shared/services/recipe.service";
import { Ingredient } from "../../shared/ingredient.model";
import { AppState } from '../../store/app.reducer';
import { UpdateRecipe, AddRecipe } from '../store/recipes.actions';
import { State } from '../store/recipes.reducer';

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipeIdx: number;
  recipe: Recipe;
  recipeFormGroup: FormGroup;
  editMode: boolean = false;

  private recipesSubscription: Subscription;

  constructor(
    // private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIdx = +params["id"];

      if (isNaN(this.recipeIdx)) {
        this.recipe = new Recipe("", "", "", []);
      } else {
        this.editMode = true;
        // this.recipe = this.recipeService.getRecipe(this.recipeIdx);
        this.recipesSubscription = this.store.select('recipes')
          .subscribe((recipesState: State) => {
            this.recipe = recipesState.recipes[this.recipeIdx];
          });
      }
    });

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      description: new FormControl(
        this.recipe.description,
        Validators.required
      ),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      ingredients: new FormArray(
        this.recipe.ingredients.map((ingredient: Ingredient) =>
          this.createIngredientFormGroup(ingredient.name, ingredient.amount)
        )
      )
    });
  }

  ngOnDestroy() {
    if (this.recipesSubscription) {
      this.recipesSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const value: any = this.recipeFormGroup.value;
    const recipe: Recipe = new Recipe(
      value.name,
      value.description,
      value.imagePath,
      value.ingredients.map(
        (ingredient: any) => new Ingredient(ingredient.name, ingredient.amount)
      )
    );

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.recipeIdx, recipe);
      this.store.dispatch(new UpdateRecipe(this.recipeIdx, recipe, this.route));

      // this.router.navigate(["../"], { relativeTo: this.route });
    } else {
      // const newRecipeIdx = this.recipeService.addRecipe(recipe);
      this.store.dispatch(new AddRecipe(recipe, this.route));

      // this.router.navigate(["../", newRecipeIdx], { relativeTo: this.route });
    }
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  createIngredientFormGroup(name: string, amount: number): FormGroup {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(Ingredient.INGREGIENT_AMOUNT_PATTERN)
      ])
    });
  }

  displayNameValidationError(): boolean {
    const control: AbstractControl = this.recipeFormGroup.get("name");

    return !control.valid && control.touched;
  }

  displayImagePathValidationError(): boolean {
    const control: AbstractControl = this.recipeFormGroup.get("imagePath");

    return !control.valid && control.touched;
  }

  displayDescriptionValidationError(): boolean {
    const control: AbstractControl = this.recipeFormGroup.get("description");

    return !control.valid && control.touched;
  }

  get ingredientsFormArray(): FormArray {
    return this.recipeFormGroup.get("ingredients") as FormArray;
  }

  get ingredientControls(): AbstractControl[] {
    return this.ingredientsFormArray.controls;
  }

  onAddNewIngredientClick() {
    this.ingredientsFormArray.push(this.createIngredientFormGroup("", 0));
  }

  deleteIngredient(ingredientIdx: number) {
    this.ingredientsFormArray.removeAt(ingredientIdx);
  }
}
