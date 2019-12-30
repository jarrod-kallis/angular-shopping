import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CustomFormsModule } from "ng2-validation";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from './shared/shared.module';
import { ProvidersModule } from './providers.module';
import { appReducer } from './store/app.reducer';
import { AuthenticationEffects } from './authentication/store/authentication.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomFormsModule,
    HttpClientModule,
    SharedModule,
    ProvidersModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthenticationEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
