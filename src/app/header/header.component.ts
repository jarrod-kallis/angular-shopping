import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/services/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  // @Output() onNavigatedToRecipes = new EventEmitter<null>();
  // @Output() onNavigatedToShoppingList = new EventEmitter<null>();

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {}

  // onNavigateToRecipes() {
  //   this.onNavigatedToRecipes.emit();
  // }

  // onNavigateToShoppingList() {
  //   this.onNavigatedToShoppingList.emit();
  // }

  fetchData() {
    this.dataStorageService.getRecipes().subscribe();
  }

  saveData() {
    this.dataStorageService.saveRecipes();
  }
}
