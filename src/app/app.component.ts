import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { AuthenticationService } from './shared/services/authentication.service';
import { User } from './shared/models/user.model';
import { PROJECT_STORAGE_USER_KEY, AUTO_LOGOUT_WARNING_SECONDS } from './shared/constants/constants';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  // RECIPES_MENU_ITEM: number = 1;
  // SHOPPING_LIST_MENU_ITEM: number = 2;
  // selectedMenuItem: number = this.RECIPES_MENU_ITEM;
  // onNavigatedToRecipes() {
  //   this.selectedMenuItem = this.RECIPES_MENU_ITEM;
  // }
  // onNavigatedToShoppingList() {
  //   this.selectedMenuItem = this.SHOPPING_LIST_MENU_ITEM;
  // }

  showAutoLogoutWarning: boolean = false;
  autoLogoutSeconds: number;

  private currentUserChangedSubscription: Subscription;
  private logoutUserTimer: NodeJS.Timer;
  private autoLogoutUserTimer: NodeJS.Timer;
  private autoLogoutSecondsCountDownTimer: NodeJS.Timer;


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // This handles all the logic around logging in & out automatically based on local storage & a timer
    this.currentUserChangedSubscription = this.authenticationService.currentUserChangedEvent
      .pipe(
        skip(1) // Skips the initial null value that is emitted when the BehaviorSubject is first instantiated
      )
      .subscribe((user: User) => {
        if (user) {
          localStorage.setItem(PROJECT_STORAGE_USER_KEY, JSON.stringify(user));

          this.autoLogoutSeconds = AUTO_LOGOUT_WARNING_SECONDS;

          console.log(user.getTokenExpirationDuration());

          this.logoutUserTimer = setTimeout(() => { this.authenticationService.logout(); }, user.getTokenExpirationDuration());
          this.autoLogoutUserTimer = setTimeout(() => {
            this.sendAutoLogoutWarning(this.autoLogoutSeconds);
          }, user.getTokenExpirationDuration() - (this.autoLogoutSeconds * 1000));
        } else {
          localStorage.removeItem(PROJECT_STORAGE_USER_KEY);
          this.removeAutoLogoutWarning();

          if (this.logoutUserTimer) {
            clearTimeout(this.logoutUserTimer);
            this.logoutUserTimer = null;
          }

          if (this.autoLogoutUserTimer) {
            clearTimeout(this.autoLogoutUserTimer);
            this.autoLogoutUserTimer = null;
          }

          this.clearAutoLogoutSecondsCountDownTimer();
        }
      });

    this.authenticationService.autoLogin();
  }

  ngOnDestroy() {
    this.currentUserChangedSubscription.unsubscribe();
  }

  sendAutoLogoutWarning(secondsRemaining: number) {
    console.log(secondsRemaining + ' seconds remaining');
    this.showAutoLogoutWarning = true;

    this.autoLogoutSecondsCountDownTimer = setInterval(() => this.autoLogoutSeconds -= 1, 1000);
  }

  removeAutoLogoutWarning() {
    this.showAutoLogoutWarning = false;
    this.clearAutoLogoutSecondsCountDownTimer();
  }

  clearAutoLogoutSecondsCountDownTimer() {
    if (this.autoLogoutSecondsCountDownTimer) {
      clearInterval(this.autoLogoutSecondsCountDownTimer);
      this.autoLogoutSecondsCountDownTimer = null;
    }
  }
}
