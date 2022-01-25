import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Button,
  ButtonType,
  Select,
  SelectOption,
  Textarea,
  Textbox,
  Toggle,
} from '@app/controls';
import { Icons } from '@app/models';
import { UserCardGroup } from '@app/pages';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { UserCardGroupService } from './add-user-card-group.services';

@Component({
  selector: 'add-user-card-group',
  templateUrl: 'add-user-card-group.component.html',
  styleUrls: ['./add-user-card-group.component.scss'],
})
export class AddUserCardGroupComponent implements OnInit {
  form: FormGroup;
  textboxName: Textbox;
  selectType: Select;
  textareaDescription: Textarea;
  togglePublic: Toggle;
  buttonSave: Button;
  buttonCancel: Button;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userCardGroupService: UserCardGroupService,
    private location: Location
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
    this.form = this.formBuilder.group({
      nameControl: ['', Validators.required],
      selectType: ['', Validators.required],
      descriptionControl: [''],
      publicControl: [''],
    });
  }

  ngOnInit() {
    this.setupSubscriptions();
    this.setupControls();
  }

  setupSubscriptions() {
    this.userCardGroupService
      .addUserCardGroupObservable()
      .subscribe((userCardGroup) => {
        if (userCardGroup) {
          this.router.navigateByUrl('/collection/dashboard');
        }
      });
  }

  setupControls() {
    this.textboxName = new Textbox({
      name: 'nameControl',
      label: 'Name',
    });
    this.selectType = new Select({
      name: 'selectType',
      label: 'Type',
      advancedSelect: true,
      multiple: false,
      placeholder: 'Select type...',
      options: [
        new SelectOption({
          text: 'Binder',
          icon: Icons.binder,
          value: 'binder',
        }),
        new SelectOption({
          text: 'Deck',
          icon: Icons.deck,
          value: 'deck',
        }),
        new SelectOption({
          text: 'Trades',
          icon: Icons.exchange,
          value: 'trades',
        }),
        new SelectOption({
          text: 'Box',
          icon: Icons.archive,
          value: 'box',
        }),
        new SelectOption({
          text: 'Group',
          icon: Icons.folder,
          value: 'group',
        }),
      ],
    });
    this.textareaDescription = new Textarea({
      name: 'descriptionControl',
      label: 'Description',
    });
    this.togglePublic = new Toggle({
      name: 'publicControl',
      text: 'Private',
      textChecked: 'Public',
    });
    this.buttonSave = new Button({
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
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.userCardGroupService.addUserCardGroup(
      new UserCardGroup({
        name: this.form.controls['nameControl'].value,
        type: this.form.controls['selectType'].value,
        description: this.form.controls['descriptionControl'].value,
        public: this.form.controls['publicControl'].value,
      })
    );
  }
}
