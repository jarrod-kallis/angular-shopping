import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-backdrop",
  templateUrl: "./backdrop.component.html",
  styleUrls: ["./backdrop.component.css"]
})
export class BackdropComponent {
  @Output() onClicked = new EventEmitter<null>();

  constructor() { }

  onClick() {
    this.onClicked.emit();
  }
}
