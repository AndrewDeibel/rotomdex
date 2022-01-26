import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DialogConfig,
  DialogService,
  Select,
  SelectOption,
  Textbox,
  Toggle,
} from '@app/controls';
import { Button, ButtonType } from '@app/controls/button';
import { APIGetPaged } from '@app/models';
import { PokemonsService } from '@app/pages';
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
    private dialogService: DialogService,
    private location: Location,
    private pokemonsService: PokemonsService
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();
    this.getPokemonVariants();
  }

  getPokemonVariants(query = '') {
    this.pokemonsService.getPokemonVariants(
      new APIGetPaged({
        page: 1,
        page_size: 24,
        sort_by: 'pokemon.order',
        sort_direction: 'asc',
        query: query,
      }),
      false
    );
  }

  setupControls() {
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
      classes: 'width-12',
      wrapperClasses: 'width-12',
      readOnly: true,
      value: this.authenticationService.currentUserValue?.email,
    });
    this.textboxUsername = new Textbox({
      label: 'Username',
      classes: 'width-12',
      wrapperClasses: 'width-12',
      readOnly: true,
      value: this.authenticationService.currentUserValue?.name,
    });
    this.selectUserIcon = new Select({
      advancedSelect: true,
      multiple: false,
      options: [],
      label: 'Avatar',
    });
    this.selectFavoritePokemon = new Select({
      advancedSelect: true,
      multiple: false,
      options: [],
      label: 'Favorite Pokemon',
      search: (search) => {
        this.getPokemonVariants(search);
      },
    });
    this.togglePublic = new Toggle({
      label: 'Visibility',
      text: 'Private',
      textChecked: 'Public',
    });
    this.buttonSubmit = new Button({
      text: 'Save',
      type: ButtonType.submit,
    });
    this.buttonCancel = new Button({
      text: 'Cancel',
      classes: 'secondary',
      click: () => {
        this.location.back();
      },
    });
    this.buttonChangePassword = new Button({
      text: 'Change Password',
      label: 'Change Password',
      classes: 'small-12',
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

  setupSubscriptions() {
    this.pokemonsService.getPokemonVariantsObservable().subscribe((res) => {
      if (res) {
        this.selectFavoritePokemon.options =
          res.pokemon_variants?.map(
            (pokemonVariant) =>
              new SelectOption({
                text: pokemonVariant.name,
                value: pokemonVariant.id.toString(),
                image: pokemonVariant.sprites.official,
              })
          ) || [];
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  }
}
