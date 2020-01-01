import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

// import { DataStorageService } from "../shared/services/data-storage.service";
// import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../shared/models/user.model';
import { AppState } from '../store/app.reducer';
import { State } from '../authentication/store/authentication.reducer';
import { Logout } from '../authentication/store/authentication.actions';
import { FetchRecipes, SaveRecipes } from '../recipes/store/recipes.actions';

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

  constructor(
    // private dataStorageService: DataStorageService,
    // private authenticationService: AuthenticationService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // this.currentUserChangedSubscription = this.authenticationService.currentUserChangedEvent
    this.currentUserChangedSubscription = this.store.select('authentication')
      .pipe(map((authenticationState: State) => authenticationState.user))
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
    // this.authenticationService.logout();
    this.store.dispatch(new Logout());
  }

  fetchData() {
    // this.dataStorageService.getRecipes().subscribe();
    this.store.dispatch(new FetchRecipes());
  }

  saveData() {
    // this.dataStorageService.saveRecipes();
    this.store.dispatch(new SaveRecipes());
  }
}
