import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CustomFormsModule } from "ng2-validation";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from './shared/shared.module';
import { ProvidersModule } from './providers.module';

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
    ProvidersModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
