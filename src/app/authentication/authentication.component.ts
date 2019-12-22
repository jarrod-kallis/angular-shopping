import { Component, OnInit } from '@angular/core';
import { AuthenticationMode } from '../shared/constants/AuthenticationMode';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  mode: AuthenticationMode = AuthenticationMode.Login;
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildFormGroup();
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
    console.log(this.form.value);
  }
}
