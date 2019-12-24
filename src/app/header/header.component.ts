import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { DataStorageService } from "../shared/services/data-storage.service";
import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() onNavigatedToRecipes = new EventEmitter<null>();
  // @Output() onNavigatedToShoppingList = new EventEmitter<null>();

  private currentUserChangedSubscription: Subscription

  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUserChangedSubscription = this.authenticationService.currentUserChangedEvent
      .subscribe((user: User) => this.isAuthenticated = user && user.hasValidToken())
  }

  ngOnDestroy() {
    this.currentUserChangedSubscription.unsubscribe();
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
