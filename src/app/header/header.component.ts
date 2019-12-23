import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/services/data-storage.service";
import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  // @Output() onNavigatedToRecipes = new EventEmitter<null>();
  // @Output() onNavigatedToShoppingList = new EventEmitter<null>();

  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUserChangedEvent.subscribe((user: User) => this.isAuthenticated = user && user.hasValidToken())
  }

  // onNavigateToRecipes() {
  //   this.onNavigatedToRecipes.emit();
  // }

  // onNavigateToShoppingList() {
  //   this.onNavigatedToShoppingList.emit();
  // }

  logout() {
    this.authenticationService.logout();
  }

  fetchData() {
    this.dataStorageService.getRecipes().subscribe();
  }

  saveData() {
    this.dataStorageService.saveRecipes();
  }
}
