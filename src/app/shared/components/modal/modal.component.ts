import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent {
  @Input() title: string = "";
  @Input() btnConfirmTitle: string;
  @Input() btnCancelTitle: string = "Cancel";

  @Output() onSubmitted = new EventEmitter<null>();
  @Output() onCancelled = new EventEmitter<null>();

  constructor() { }

  onSubmitClick() {
    this.onSubmitted.emit();
  }

  onCancelClick() {
    this.onCancelled.emit();
  }
}
