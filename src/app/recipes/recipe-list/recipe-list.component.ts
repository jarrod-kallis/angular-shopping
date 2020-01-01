import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from "../recipe.model";
// import { RecipeService } from "../../shared/services/recipe.service";
import { AppState } from '../../store/app.reducer';
import { State } from '../store/recipes.reducer';

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  // recipesChangedSubscription: Subscription;
  recipesSubscription: Subscription;
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Recipe',
  //     'This is simply a test',
  //     'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?cs=srgb&dl=burrito-chicken-close-up-461198.jpg&fm=jpg'
  //   ),
  //   new Recipe(
  //     'Test Recipe2',
  //     'This is simply a test 2',
  //     'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_981,c_fill,g_auto,h_552,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170517150325-food-general.jpg'
  //   )
  // ];

  // @Output("onRecipeSelected") onRecipeSelected2 = new EventEmitter<Recipe>();

  constructor(
    // private recipeService: RecipeService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // this.recipesChangedSubscription = this.recipeService.onRecipesChangedEvent.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );

    // this.recipes = this.recipeService.getRecipes();

    this.recipesSubscription = this.store.select('recipes')
      .pipe(
        map((recipeState: State) => recipeState.recipes)
      )
      .subscribe((recipes: Recipe[]) => this.recipes = recipes);
  }

  ngOnDestroy() {
    // this.recipesChangedSubscription.unsubscribe();
    this.recipesSubscription.unsubscribe();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.onRecipeSelected2.emit(recipe);
  // }
}
