import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Button,
  ButtonType,
  Select,
  SelectOption,
  Textarea,
  Textbox,
  Toggle,
} from '@app/controls';
import { APIGetPaged, Icons } from '@app/models';
import { UserCardGroup } from '@app/pages';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { UserCardGroupService } from '../user-card-group.services';

@Component({
  selector: 'add-edit-card-group',
  templateUrl: 'add-edit-card-group.component.html',
  styleUrls: ['./add-edit-card-group.component.scss'],
})
export class AddUserCardGroupComponent implements OnInit {
  form: FormGroup;
  textboxName: Textbox;
  selectType: Select;
  textareaDescription: Textarea;
  togglePublic: Toggle;
  buttonSave: Button;
  buttonCancel: Button;
  buttonDelete: Button;
  id: number;
  userCardGroup: UserCardGroup;
  title: string = 'Add Group';
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userCardGroupService: UserCardGroupService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  setupForm() {
    this.form = this.formBuilder.group({
      nameControl: ['', Validators.required],
      selectType: ['', Validators.required],
      descriptionControl: [''],
      publicControl: [false],
    });
  }

  ngOnInit() {
    this.handleRoute();
    this.setupSubscriptions();
    this.setupControls();
  }

  handleRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = Number(params['id']);
        this.title = 'Edit Group';
        this.userCardGroupService.getUserCardGroup(this.id);
      }
    });
  }

  setupSubscriptions() {
    this.userCardGroupService
      .addUserCardGroupObservable()
      .subscribe((userCardGroup) => {
        if (userCardGroup) {
          this.router.navigateByUrl(`/collection/group/${userCardGroup.id}`);
          this.getUserCardGroups();
        }
      });
    this.userCardGroupService
      .getUserCardGroupObservable()
      .subscribe((userCardGroup) => {
        if (userCardGroup) {
          this.userCardGroup = userCardGroup;
          this.form.controls['nameControl'].setValue(this.userCardGroup.name);
          this.form.controls['selectType'].setValue(this.userCardGroup.type);
          this.form.controls['descriptionControl'].setValue(
            this.userCardGroup.description
          );
          this.form.controls['publicControl'].setValue(
            this.userCardGroup.public
          );
          this.buttonDelete = new Button({
            text: 'Delete',
            classes: 'error',
            click: () => {
              if (
                confirm(
                  `Are you sure you want to delete ${this.userCardGroup.name}?`
                )
              ) {
                this.userCardGroupService.removeUserCardGroup(
                  this.userCardGroup
                );
              }
            },
          });
        }
      });
    this.userCardGroupService
      .removeUserCardGroupObservable()
      .subscribe((card_group_id) => {
        if (card_group_id) {
          this.getUserCardGroups();
          this.router.navigateByUrl('/collection');
        }
      });
  }

  getUserCardGroups() {
    this.userCardGroupService.getUserCardGroups(
      new APIGetPaged({
        page: 1,
        page_size: 100,
      })
    );
  }

  setupControls() {
    this.setupForm();
    this.textboxName = new Textbox({
      label: 'Name',
      classes: 'width-12',
      wrapperClasses: 'width-12',
    });
    this.selectType = new Select({
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
          value: 'exchange',
        }),
        new SelectOption({
          text: 'Box',
          icon: Icons.archive,
          value: 'archive',
        }),
        new SelectOption({
          text: 'Group',
          icon: Icons.folder,
          value: 'folder',
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
      click: () => {
        this.location.back();
      },
    });
  }

  submit() {
    this.form.markAsDirty();
    if (!this.form.invalid) {
      // Update group
      if (this.id) {
        this.userCardGroupService.updateUserCardGroup(
          new UserCardGroup({
            name: this.form.controls['nameControl'].value,
            type: this.form.controls['selectType'].value,
            description: this.form.controls['descriptionControl'].value,
            public: this.form.controls['publicControl'].value,
            id: this.id,
          })
        );
      }

      // Add group
      else {
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
  }
}
