import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponentPlaceholder]'
})
export class DynamicComponentPlaceholderDirective {

  constructor(private _viewContainerRef: ViewContainerRef) { }

  public get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }
}
