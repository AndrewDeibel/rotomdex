import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DialogConfig,
  DialogService,
  Select,
  Textbox,
  Toggle,
} from '@app/controls';
import { Button, ButtonType } from '@app/controls/button';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
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
    private dialogService: DialogService
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
      value: this.authenticationService.currentUserValue?.name,
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
      click: () => {
        this.dialogService.open(
          ChangePasswordDialogComponent,
          new DialogConfig({
            title: 'Change Password',
          })
        );
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  }
}
