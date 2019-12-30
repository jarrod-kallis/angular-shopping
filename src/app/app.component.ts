import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ComponentFactory, ViewChild, ViewContainerRef, ComponentRef, TemplateRef } from "@angular/core";
import { Subscription } from 'rxjs';
import { skip, map, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router, RouterEvent, NavigationStart } from '@angular/router';

import { environment } from '../environments/environment';
import { AuthenticationService } from './shared/services/authentication.service';
import { User } from './shared/models/user.model';
import { ModalComponent } from './shared/components/modal/modal.component';
import { DynamicComponentPlaceholderDirective } from './shared/directives/dynamic-component-placeholder.directive';
import { AppState } from './store/app.reducer';
import { State } from './authentication/store/authentication.reducer';

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

  @ViewChild(DynamicComponentPlaceholderDirective) autoLogoutModalSpot: DynamicComponentPlaceholderDirective;
  @ViewChild('autoLogoutModalContentTemplate') autoLogoutModalContentTemplate: TemplateRef<any>;

  showAutoLogoutWarning: boolean = false;
  autoLogoutSeconds: number;

  private autoLogoutModalCloseSubscription: Subscription;

  private currentUserChangedSubscription: Subscription;
  private logoutUserTimer: NodeJS.Timer;
  private autoLogoutUserTimer: NodeJS.Timer;
  private autoLogoutSecondsCountDownTimer: NodeJS.Timer;

  constructor(
    private authenticationService: AuthenticationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  ngOnInit() {
    // This handles all the logic around logging in & out automatically based on local storage & a timer
    // this.currentUserChangedSubscription = this.authenticationService.currentUserChangedEvent
    this.currentUserChangedSubscription = this.store.select('authentication')
      .pipe(
        skip(1), // Skips the initial null value that is emitted when the BehaviorSubject is first instantiated
        map((authenticationState: State) => authenticationState.user)
      )
      .subscribe((user: User) => {
        if (user) {
          localStorage.setItem(environment.projectStorageUserKey, JSON.stringify(user));

          const userTokenExpirationDurationInSeconds: number = Math.trunc(user.getTokenExpirationDuration() / 1000);

          this.autoLogoutSeconds = environment.autoLogoutWarningSeconds > userTokenExpirationDurationInSeconds
            ? userTokenExpirationDurationInSeconds
            : environment.autoLogoutWarningSeconds;

          console.log(userTokenExpirationDurationInSeconds);

          this.logoutUserTimer = setTimeout(() => {
            this.authenticationService.logout();
          }, user.getTokenExpirationDuration());

          this.autoLogoutUserTimer = setTimeout(() => {
            this.sendAutoLogoutWarning(this.autoLogoutSeconds);
          }, user.getTokenExpirationDuration() - (this.autoLogoutSeconds * 1000));
        } else {
          localStorage.removeItem(environment.projectStorageUserKey);
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

    // Get the current URL before trying to log in automatically, so we can stay on the URL if the user token is still valid
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        // Take the first NavigationStart event and then unsubscribe
        take(1)
      )
      .subscribe((event: NavigationStart) => {
        this.authenticationService.autoLogin(event.url);
      });
  }

  ngOnDestroy() {
    this.currentUserChangedSubscription.unsubscribe();

    if (this.autoLogoutModalCloseSubscription) {
      this.autoLogoutModalCloseSubscription.unsubscribe();
    }
  }

  sendAutoLogoutWarning(secondsRemaining: number) {
    console.log(secondsRemaining + ' seconds remaining');
    this.showAutoLogoutWarning = true;
    // this.createAutoLogoutModal();

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

  private createAutoLogoutModal() {
    const modalComponentFactory: ComponentFactory<ModalComponent> = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    const viewContainerRef: ViewContainerRef = this.autoLogoutModalSpot.viewContainerRef;
    viewContainerRef.clear();

    // Creates the content inside the ng-template
    const contentRef = this.autoLogoutModalContentTemplate.createEmbeddedView({});

    const modalComponentRef: ComponentRef<ModalComponent> = viewContainerRef.createComponent(modalComponentFactory, 0, null, [contentRef.rootNodes]);
    const modalComponentInstance: ModalComponent = modalComponentRef.instance;

    modalComponentInstance.title = "Auto Logout Warning";
    this.autoLogoutModalCloseSubscription = modalComponentInstance.onCancelled.subscribe(() => {
      this.removeAutoLogoutWarning();
      viewContainerRef.clear();
      this.autoLogoutModalCloseSubscription.unsubscribe();
    });
  }
}
