import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/directive/dropdown.directive";
import { ShoppingListService } from "./shared/services/shopping-list.service";
import { AppRoutingModule } from "./app-routing.module";
import { NoRecipeSelectedComponent } from "./recipes/no-recipe-selected/no-recipe-selected.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeService } from "./shared/services/recipe.service";
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { FormItemComponent } from './shared/components/form-item/form-item.component';
import { AuthenticationInterceptorService } from './shared/services/authentication-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeDetailComponent,
    ShoppingEditComponent,
    DropdownDirective,
    NoRecipeSelectedComponent,
    RecipeEditComponent,
    AuthenticationComponent,
    LoadingComponent,
    ErrorComponent,
    FormItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
