import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  { path: "login", loadChildren: "./authentication/authentication.module#AuthenticationModule" },
  { path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule" },
  // Angular 8
  // { path: "recipes", loadChildren: () => import("./recipes/recipes.module").then(m => m.ModuleName) }
  { path: "shopping-list", loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules } // Load all lazy loaded routes while user is browsing
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
