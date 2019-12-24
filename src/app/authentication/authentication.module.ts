import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: "login", component: AuthenticationComponent }
    ]),
    SharedModule
  ],
})
export class AuthenticationModule { }
