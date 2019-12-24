import { NgModule } from '@angular/core';

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { NoRecipeSelectedComponent } from "./no-recipe-selected/no-recipe-selected.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeDetailComponent,
    NoRecipeSelectedComponent,
    RecipeEditComponent
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ],
  // exports: [
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipesComponent,
  //   RecipeDetailComponent,
  //   NoRecipeSelectedComponent,
  //   RecipeEditComponent
  // ]
})
export class RecipesModule { }
