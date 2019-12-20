import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray
} from "@angular/forms";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../../shared/services/recipe.service";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  private recipeIdx: number;
  recipe: Recipe;
  recipeFormGroup: FormGroup;
  editMode: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIdx = +params["id"];

      if (isNaN(this.recipeIdx)) {
        this.recipe = new Recipe("", "", "", []);
      } else {
        this.recipe = this.recipeService.getRecipe(+params["id"]);
        this.editMode = true;
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
      this.recipeService.updateRecipe(this.recipeIdx, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

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
}
