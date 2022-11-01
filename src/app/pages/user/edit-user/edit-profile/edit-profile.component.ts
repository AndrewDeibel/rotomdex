import { getUserAvatars } from '../../user';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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
import { PokemonsService, User } from '@app/pages';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'edit-user',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  form: UntypedFormGroup;
  textboxUsername: Textbox;
  textboxEmail: Textbox;
  togglePublic: Toggle;
  buttonSubmit: Button;
  buttonCancel: Button;
  selectUserAvatar: Select;
  selectFavoritePokemon: Select;
  buttonChangePassword: Button;

  constructor(
    private formBuilder: UntypedFormBuilder,
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
  }
  ngOnDestroy() {}

  setupControls() {
    const user = this.authenticationService.currentUserValue;
    this.form = this.formBuilder.group({
      userAvatarControl: [user?.avatar],
      favoritePokemonControl: [user?.favorite_pokemon_variant_id],
      publicControl: [user?.public || false],
    });
    this.textboxEmail = new Textbox({
      label: 'Email',
      type: 'email',
      classes: 'width-12',
      wrapperClasses: 'width-12',
      readOnly: true,
      value: user?.email,
    });
    this.textboxUsername = new Textbox({
      label: 'Username',
      classes: 'width-12',
      wrapperClasses: 'width-12',
      readOnly: true,
      value: user?.name,
    });
    this.selectUserAvatar = new Select({
      advancedSelect: true,
      multiple: false,
      options: getUserAvatars(),
      label: 'Avatar',
      placeholder: 'Select avatar...',
      value: user?.avatar,
    });
    this.selectFavoritePokemon = new Select({
      advancedSelect: true,
      multiple: false,
      options: [],
      label: 'Favorite Pokemon',
      placeholder: 'Select favorite pokemon...',
      search: (search) => {
        this.getPokemonVariants(search);
      },
    });
    if (user?.favorite_pokemon_variant_id) {
      if (user.favorite_pokemon)
        this.getPokemonVariants(user?.favorite_pokemon.name);
    }
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
    // Receive pokemon
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

        const user = this.authenticationService.currentUserValue;
        if (user?.favorite_pokemon_variant_id) {
          this.selectFavoritePokemon.value =
            user.favorite_pokemon_variant_id.toString();
          this.selectFavoritePokemon.setSelectedOptions();
        }
      }
    });
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

  submit() {
    if (!this.form.invalid) {
      this.authenticationService.updateUser(
        new User({
          avatar: this.form.controls['userAvatarControl'].value,
          favorite_pokemon_variant_id:
            this.form.controls['favoritePokemonControl'].value,
          public: this.form.controls['publicControl'].value,
        })
      );
    }
  }
}
