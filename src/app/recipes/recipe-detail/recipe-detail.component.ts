import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
// import { ShoppingListService } from "../../shared/services/shopping-list.service";
// import { RecipeService } from "../../shared/services/recipe.service";
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { AppState } from '../../store/app.reducer';
import { State } from '../store/recipes.reducer';
import { DeleteRecipe } from '../store/recipes.actions';

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
    // private recipeService: RecipeService,
    // private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    console.log('RecipeDetailComponent constructor');
  }

  ngOnInit() {
    console.log('RecipeDetailComponent onInit');

    // this.route.params.subscribe((params: Params) => {
    //   this.recipeIdx = +params["id"];

    //   this.recipe = this.recipeService.getRecipe(this.recipeIdx);
    // });

    this.route.params
      .pipe(
        map((params: Params) => +params.id),
        switchMap((id: number) => {
          this.recipeIdx = id;
          return this.store.select('recipes');
        }),
        map((recipesState: State) => recipesState.recipes),
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipe = recipes[this.recipeIdx];
      })
  }

  addToShoppingList = () => {
    // this.shoppingListService.addIngredients(this.recipe.ingredients.slice());
    this.store.dispatch(new AddIngredients(this.recipe.ingredients.slice()));
  };

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipeIdx);
    this.store.dispatch(new DeleteRecipe(this.recipeIdx, this.route));

    // this.router.navigate(["../"], { relativeTo: this.route });
  }
}
