import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthenticationMode } from '../shared/constants/authentication-mode';
// import { AuthenticationService } from '../shared/services/authentication.service';
// import { AuthenticationResponse } from '../shared/models/authentication-response.model';
import { AppState } from '../store/app.reducer';
import { LoginStart, SignUpStart } from './store/authentication.actions';
import { State } from './store/authentication.reducer';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  mode: AuthenticationMode = AuthenticationMode.Login;
  form: FormGroup;
  errorMsg: string = "";
  isBusy: boolean = false;

  private authenticationStateSubscription: Subscription;

  constructor(
    // private authenticationService: AuthenticationService,
    // private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // Listen to any changes to the authentication state
    this.authenticationStateSubscription = this.store.select('authentication').subscribe(
      (authenticationState: State) => {
        this.errorMsg = authenticationState.errorMessage;
        this.isBusy = authenticationState.isBusy;
      }
    )

    this.buildFormGroup();
  }

  ngOnDestroy() {
    this.authenticationStateSubscription.unsubscribe();
  }

  buildFormGroup(currentValues: any = {}) {
    const controls = this.inSignUpMode() ? {
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required, this.confirmPasswordValidation])
    } : {};

    this.form = new FormGroup({
      email: new FormControl(currentValues.email, [Validators.required, Validators.email]),
      password: new FormControl(currentValues.password, [Validators.required, Validators.minLength(6)]),
      ...controls
    })
  }

  getLoginButtonCaption() {
    return this.mode === AuthenticationMode.Login ? "Log In" : "Sign Up";
  }

  getSwitchToButtonCaption() {
    return "Switch To " + (this.mode === AuthenticationMode.Login ? "Sign Up" : "Log In");
  }

  btnSwitchToClick() {
    this.mode = this.mode === AuthenticationMode.Login ? AuthenticationMode.SignUp : AuthenticationMode.Login;

    this.buildFormGroup(this.form.value);
  }

  inSignUpMode(): boolean {
    return this.mode === AuthenticationMode.SignUp;
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  confirmPasswordValidation = (
    formControl: FormControl
  ): { [s: string]: boolean } => {
    if (this.form.value.password !== formControl.value) {
      return { passwordsDoNotMatch: true };
    } else {
      return null;
    }
  };

  isFormControlInvalid(name: string): boolean {
    const control: FormControl = this.getFormControl(name);

    return !control.valid && control.touched;
  }

  onSubmit() {
    const value: { email: string, password: string } = this.form.value;

    // let authenticationObservable: Observable<AuthenticationResponse>;

    // this.isBusy = true;
    // this.errorMsg = "";

    if (this.mode === AuthenticationMode.SignUp) {
      // authenticationObservable = this.authenticationService.signUp(value.email, value.password);
      this.store.dispatch(new SignUpStart(value.email, value.password));
    } else if (this.mode === AuthenticationMode.Login) {
      // authenticationObservable = this.authenticationService.login(value.email, value.password);
      this.store.dispatch(new LoginStart(value.email, value.password));
    }

    // authenticationObservable.subscribe((response: AuthenticationResponse) => {
    //   this.errorMsg = "";
    //   this.isBusy = false;

    //   this.router.navigate(["recipes"]);
    // }, errorMessage => {
    //   this.errorMsg = errorMessage;
    //   this.isBusy = false;
    // });
  }
}
