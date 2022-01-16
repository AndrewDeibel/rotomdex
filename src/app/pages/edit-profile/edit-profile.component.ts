import { LoaderService } from '../../controls/loader/loader.service';
import { Button, ButtonType } from '@app/controls/button';
import { Textbox, Toggle, Select } from '@app/controls';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  textboxUsername: Textbox;
  textboxEmail: Textbox;
  togglePublic: Toggle;
  buttonSubmit: Button;
  buttonCancel: Button;
  selectUserIcon: Select;
  selectFavoritePokemon: Select;
  buttonChangePassword: Button;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailControl: [''],
      usernameControl: [''],
      userIconControl: [''],
      favoritePokemonControl: [''],
      publicControl: [''],
    });
    this.textboxEmail = new Textbox({
      label: 'Email',
      type: 'email',
      readOnly: true,
      value: this.authenticationService.currentUserValue?.email,
    });
    this.textboxUsername = new Textbox({
      label: 'Username',
      readOnly: true,
      value: this.authenticationService.currentUserValue?.username,
    });
    this.selectUserIcon = new Select({
      advancedSelect: true,
      multiple: false,
      options: [],
      label: 'Icon',
    });
    this.selectFavoritePokemon = new Select({
      advancedSelect: true,
      multiple: false,
      options: [],
      label: 'Favorite Pokemon',
    });
    this.togglePublic = new Toggle({
      label: 'Visibility',
      text: 'Private',
      textChecked: 'Public',
    });
    this.buttonSubmit = new Button({
      text: 'Save Profile',
      type: ButtonType.submit,
    });
    this.buttonCancel = new Button({
      text: 'Cancel',
      classes: 'secondary',
    });
    this.buttonChangePassword = new Button({
      text: 'Change Password',
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loaderService.addItemLoading('register');
  }
}
