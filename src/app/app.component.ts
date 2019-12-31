import {
  Component, OnInit, OnDestroy, ComponentFactoryResolver, ComponentFactory,
  ViewChild, ViewContainerRef, ComponentRef, TemplateRef
} from "@angular/core";
import { Subscription } from 'rxjs';
import { skip, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { User } from './shared/models/user.model';
import { ModalComponent } from './shared/components/modal/modal.component';
import { DynamicComponentPlaceholderDirective } from './shared/directives/dynamic-component-placeholder.directive';
import { AppState } from './store/app.reducer';
import { State } from './authentication/store/authentication.reducer';
import { AutoLogin } from './authentication/store/authentication.actions';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicComponentPlaceholderDirective) autoLogoutModalSpot: DynamicComponentPlaceholderDirective;
  @ViewChild('autoLogoutModalContentTemplate') autoLogoutModalContentTemplate: TemplateRef<any>;

  showAutoLogoutWarning: boolean = false;
  autoLogoutSeconds: number;

  private autoLogoutModalCloseSubscription: Subscription;

  private currentUserChangedSubscription: Subscription;
  private autoLogoutUserTimer: NodeJS.Timer;
  private autoLogoutSecondsCountDownTimer: NodeJS.Timer;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new AutoLogin());

    // This handles all the logic around logging in & out automatically based on local storage & a timer
    // this.currentUserChangedSubscription = this.authenticationService.currentUserChangedEvent
    this.currentUserChangedSubscription = this.store.select('authentication')
      .pipe(
        skip(1), // Skips the initial null value that is emitted when the BehaviorSubject is first instantiated
        map((authenticationState: State) => authenticationState.user)
      )
      .subscribe((user: User) => {
        if (user) {
          const userTokenExpirationDurationInSeconds: number = Math.trunc(user.getTokenExpirationDuration() / 1000);

          this.autoLogoutSeconds = environment.autoLogoutWarningSeconds > userTokenExpirationDurationInSeconds
            ? userTokenExpirationDurationInSeconds
            : environment.autoLogoutWarningSeconds;

          console.log(userTokenExpirationDurationInSeconds);

          this.autoLogoutUserTimer = setTimeout(() => {
            this.startAutoLogoutWarning();
          }, user.getTokenExpirationDuration() - (this.autoLogoutSeconds * 1000));
        } else {
          this.removeAutoLogoutWarning();

          if (this.autoLogoutUserTimer) {
            clearTimeout(this.autoLogoutUserTimer);
            this.autoLogoutUserTimer = null;
          }

          this.clearAutoLogoutSecondsCountDownTimer();
        }
      });
  }

  ngOnDestroy() {
    this.currentUserChangedSubscription.unsubscribe();

    if (this.autoLogoutModalCloseSubscription) {
      this.autoLogoutModalCloseSubscription.unsubscribe();
    }
  }

  startAutoLogoutWarning() {
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
