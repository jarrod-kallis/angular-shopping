import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  // My Way
  // @HostBinding('class') class = '';

  // @HostListener('click') click() {
  //   if (this.class === '') {
  //     this.class = 'open';
  //   } else {
  //     this.class = '';
  //   }
  // }

  // Max's Way
  @HostBinding("class.open") isOpen = false;

  // @HostListener("click") toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  @HostListener("document:click", ["$event"]) toggleOpenFromAnywhere(
    event: Event
  ) {
    // The element that the user clicked on
    // console.log(event.target);
    // The element that the directive has been placed on
    // console.log(this.elRef.nativeElement);
    // Is the 'click-on element' within the 'directive element'
    // console.log("Contains: " + this.elRef.nativeElement.contains(event.target));

    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef) { }
}
