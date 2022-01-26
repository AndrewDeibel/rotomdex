import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, ButtonType } from '@app/controls/button';
import { Checkbox } from '@app/controls/checkbox';
import { Textbox } from '@app/controls/textbox/textbox';
import { AuthenticationService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent implements OnInit {
  returnUrl: string;
  form: FormGroup;
  textboxEmail: Textbox;
  textboxPassword: Textbox;
  rememberMeCheckbox: Checkbox;
  buttonSubmit: Button;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();
  }

  setupControls() {
    this.form = this.formBuilder.group({
      emailControl: ['', Validators.required],
      passwordControl: ['', Validators.required],
      //rememberMeControl: [''],
    });
    this.textboxEmail = new Textbox({
      label: 'Email',
      classes: 'width-12',
      wrapperClasses: 'width-12',
    });
    this.textboxPassword = new Textbox({
      label: 'Password',
      type: 'password',
      classes: 'width-12',
      wrapperClasses: 'width-12',
    });
    this.rememberMeCheckbox = new Checkbox({
      text: 'Remember Me',
      id: 'rememberMe',
    });
    this.buttonSubmit = new Button({
      text: 'Sign In',
      type: ButtonType.submit,
    });

    // Get return url from route params, else default to /
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  setupSubscriptions() {
    this.authenticationService.currentUserObservable().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.authenticationService.login(
      this.textboxEmail.value,
      this.textboxPassword.value
    );
  }
}
