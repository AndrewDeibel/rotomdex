import { Icons } from '@app/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import {
  Textbox,
  Button,
  Textarea,
  Toggle,
  Select,
  SelectOption,
  ButtonType,
} from '@app/controls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collection-card-group',
  templateUrl: 'collection-card-group.component.html',
  styleUrls: ['./collection-card-group.component.scss'],
})
export class CollectionCardGroupComponent implements OnInit {
  form: FormGroup;
  textboxName: Textbox;
  selectType: Select;
  selectIcon: Select;
  textareaDescription: Textarea;
  togglePublic: Toggle;
  buttonSave: Button;
  buttonCancel: Button;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nameControl: ['', Validators.required],
      selectType: ['', Validators.required],
      selectIcon: ['', Validators.required],
      descriptionControl: [''],
      publicControl: [''],
    });
    this.textboxName = new Textbox({
      label: 'Name',
    });
    this.selectType = new Select({
      label: 'Type',
      advancedSelect: true,
      multiple: true,
      placeholder: 'Select icon...',
      options: [
        new SelectOption({
          text: 'Binder',
          icon: Icons.binder,
        }),
        new SelectOption({
          text: 'Deck',
          icon: Icons.deck,
        }),
        new SelectOption({
          text: 'Trades',
          icon: Icons.exchange,
        }),
        new SelectOption({
          text: 'Box',
          icon: Icons.archive,
        }),
        new SelectOption({
          text: 'Group',
          icon: Icons.folder,
        }),
      ],
    });
    this.selectIcon = new Select({
      label: 'Icon',
      advancedSelect: true,
      placeholder: 'Select icon...',
      options: [
        new SelectOption({
          text: 'Binder',
          icon: Icons.binder,
        }),
        new SelectOption({
          text: 'Deck',
          icon: Icons.deck,
        }),
        new SelectOption({
          text: 'Trades',
          icon: Icons.exchange,
        }),
        new SelectOption({
          text: 'Box',
          icon: Icons.archive,
        }),
        new SelectOption({
          text: 'Group',
          icon: Icons.folder,
        }),
      ],
    });
    this.textareaDescription = new Textarea({
      label: 'Description',
    });
    this.togglePublic = new Toggle({
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
      route: '/collection/dashboard',
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  }
}
