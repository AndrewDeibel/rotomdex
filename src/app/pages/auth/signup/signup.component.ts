import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, ButtonType } from '@app/controls/button';
import { Textbox } from '@app/controls/textbox/textbox';
import { AuthenticationService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit {
  returnUrl: string;
  form: FormGroup;
  textboxEmail: Textbox;
  textboxUsername: Textbox;
  textboxPassword: Textbox;
  textboxConfirmPassword: Textbox;
  textboxCode: Textbox;
  buttonSubmit: Button;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();
  }

  setupControls() {
    this.form = this.formBuilder.group({
      codeControl: ['', Validators.required],
      emailControl: ['', Validators.required],
      usernameControl: ['', Validators.required],
      passwordControl: ['', Validators.required],
      passwordConfirmControl: ['', Validators.required],
    });
    this.textboxCode = new Textbox({
      label: 'Beta Code',
      classes: 'width-12',
      wrapperClasses: 'width-12',
    });
    this.textboxEmail = new Textbox({
      label: 'Email',
      type: 'email',
      classes: 'width-12',
      wrapperClasses: 'width-12',
    });
    this.textboxUsername = new Textbox({
      label: 'Username',
      classes: 'width-12',
      wrapperClasses: 'width-12',
    });
    this.textboxPassword = new Textbox({
      label: 'Password',
      classes: 'width-12',
      wrapperClasses: 'width-12',
      type: 'password',
    });
    this.textboxConfirmPassword = new Textbox({
      label: 'Confirm Password',
      type: 'password',
      classes: 'width-12',
      wrapperClasses: 'width-12',
    });
    this.buttonSubmit = new Button({
      text: 'Sign Up',
      type: ButtonType.submit,
    });

    // Get return url from route params, else default to /
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  setupSubscriptions() {
    this.authenticationService.currentUserObservable().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.form.controls['codeControl'].setValue(code);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.authenticationService.register(
      this.textboxCode.value,
      this.textboxEmail.value,
      this.textboxUsername.value,
      this.textboxPassword.value,
      this.textboxConfirmPassword.value
    );
  }
}
