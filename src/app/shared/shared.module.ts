import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './directive/dropdown.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { FormItemComponent } from './components/form-item/form-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { DynamicComponentPlaceholderDirective } from './directives/dynamic-component-placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingComponent,
    ErrorComponent,
    FormItemComponent,
    ModalComponent,
    BackdropComponent,
    DynamicComponentPlaceholderDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownDirective,
    LoadingComponent,
    ErrorComponent,
    FormItemComponent,
    ModalComponent,
    BackdropComponent,
    DynamicComponentPlaceholderDirective
  ],
  entryComponents: [ModalComponent] // Programmatically created components
})
export class SharedModule { }
