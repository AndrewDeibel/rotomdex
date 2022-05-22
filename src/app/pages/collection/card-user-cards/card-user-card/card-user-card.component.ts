import { DialogRef } from './../../../../controls/dialog/dialog';
import { AddUserCardGroupComponent } from './../../user-card-group/add-edit-card-group/add-edit-card-group.component';
import { UserCardGroupComponent } from './../../user-card-group/user-card-group.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Button,
  DialogConfig,
  DialogService,
  Select,
  SelectOption,
  SelectOptionGroup,
} from '@app/controls';
import {
  APIGetPaged,
  Condition,
  ConditionGraded,
  GradingCompany,
  Icons,
  Printings,
} from '@app/models';
import {
  CardUserCardNotesDialogComponent,
  UserCard,
  UserCardGroup,
} from '@app/pages';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { UserCardGroupService } from '../../user-card-group';
import { Card } from '@app/pages/cards';
import { AuthenticationService } from '@app/pages/auth';

@AutoUnsubscribe()
@Component({
  selector: 'card-user-card',
  templateUrl: './card-user-card.component.html',
  styleUrls: ['./card-user-card.component.scss'],
})
export class CardUserCardComponent implements OnInit {
  @Input() item: UserCard;
  @Input() userCardGroups: UserCardGroup[] = [];
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  @Output() updated: EventEmitter<UserCard> = new EventEmitter();
  @Input() variations: Card[] = [];
  selectCondition: Select;
  selectGradingCompany: Select;
  selectPrinting: Select;
  selectGroup: Select;
  buttonNotes: Button;
  buttonAdd: Button;
  buttonRemove: Button;
  dialogAddGroup: DialogRef;

  constructor(
    private dialogService: DialogService,
    private userCardGroupService: UserCardGroupService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.buildControls();
    this.setupSubscriptions();
  }
  ngOnDestroy() {}

  ngOnChanges(): void {
    this.setupSelectGroupOptions();
  }

  buildControls() {
    // Condition
    this.selectCondition = new Select({
      label: 'Condition',
      classes: 'square-right',
      options: [
        new SelectOption({
          value: '',
          text: '-',
        }),
      ],
      optionGroups: [
        new SelectOptionGroup({
          label: 'Condition',
        }),
        new SelectOptionGroup({
          label: 'Condition Graded',
        }),
      ],
      change: (value) => {
        var condition =
          (Condition as any)[value.replace(' ', '')] ||
          (ConditionGraded as any)[value.replace(' ', '').replace('.', '')];
        this.updated.emit(
          new UserCard({
            ...this.item,
            condition,
          })
        );
      },
    });
    for (let condition in Condition) {
      this.selectCondition.optionGroups[0].options.push(
        new SelectOption({
          text: (Condition as any)[condition],
          value: (Condition as any)[condition],
          selected: (Condition as any)[condition] === this.item.condition,
        })
      );
    }
    for (let conditionGraded in ConditionGraded) {
      this.selectCondition.optionGroups[1].options.push(
        new SelectOption({
          text: (ConditionGraded as any)[conditionGraded],
          value: (ConditionGraded as any)[conditionGraded],
          selected:
            (ConditionGraded as any)[conditionGraded] === this.item.condition,
        })
      );
    }
    this.selectCondition.value = this.item.condition;

    // Grading company
    this.selectGradingCompany = new Select({
      label: 'Graded By',
      classes: 'square small-round-right',
      optionGroups: [
        new SelectOptionGroup({
          label: 'Graded By',
          options: [
            new SelectOption({
              value: '',
              text: '-',
            }),
          ],
        }),
      ],
      change: (value) => {
        this.updated.emit(
          new UserCard({
            ...this.item,
            graded_by: (GradingCompany as any)[value.replace(' ', '')],
          })
        );
      },
    });
    for (let gradingCompany in GradingCompany) {
      this.selectGradingCompany.optionGroups[0].options.push(
        new SelectOption({
          text: (GradingCompany as any)[gradingCompany],
          value: (GradingCompany as any)[gradingCompany],
          selected:
            (GradingCompany as any)[gradingCompany] === this.item.graded_by,
        })
      );
    }
    this.selectGradingCompany.value = this.item.graded_by;

    // Printing
    this.selectPrinting = new Select({
      label: 'Printing',
      classes: 'square small-round-left',
      optionGroups: [
        new SelectOptionGroup({
          label: 'Printing',
          options: [
            new SelectOption({
              value: '',
              text: '-',
            }),
          ],
        }),
      ],
      change: (value) => {
        this.updated.emit(
          new UserCard({
            ...this.item,
            card_variation_id: Number(value),
          })
        );
      },
    });
    // for (let printVersion in Printings) {
    //   this.selectPrinting.optionGroups[0].options.push(
    //     new SelectOption({
    //       text: (Printings as any)[printVersion],
    //       value: (Printings as any)[printVersion],
    //       selected: (Printings as any)[printVersion] === this.item.printing,
    //     })
    //   );
    // }
    for (let variation in this.variations) {
      this.selectPrinting.optionGroups[0].options.push(
        new SelectOption({
          text: this.variations[variation].name,
          value: this.variations[variation].id.toString(),
          selected:
            this.item.card_variation &&
            this.variations[variation].id ===
              Number(this.item.card_variation.id),
        })
      );
    }
    if (this.item.card_variation)
      this.selectPrinting.value = this.item.card_variation.id.toString();
    // Group
    this.selectGroup = new Select({
      label: 'Group',
      placeholder: 'Select group(s)...',
      classes: 'square small-round-right',
      multiple: true,
      advancedSelect: true,
      change: (value) => {
        const groupIds = value.length ? value.split(',').map(Number) : [];
        //const groups = this.userCardGroups.filter(group => groupIds.includes(group.id);
        this.updated.emit(
          new UserCard({
            ...this.item,
            card_groups: groupIds,
          })
        );
      },
      add: () => {
        this.dialogAddGroup = this.dialogService.open(
          AddUserCardGroupComponent,
          new DialogConfig({
            title: 'Add Group',
          })
        );
      },
    });
    this.setupSelectGroupOptions();

    this.selectGroup.value = this.item.card_groups
      ? this.item.card_groups[0] instanceof Object
        ? this.item.card_groups
            .map((userCardGroup) => (userCardGroup as UserCard).id)
            .join(',')
        : this.item.card_groups.join(',')
      : '';

    // Notes
    this.buttonNotes = new Button({
      text: 'Notes',
      icon: Icons.stickyNote,
      classes: 'square secondary small-round-left',
      width: '100%',
      click: () => {
        const ref = this.dialogService.open(
          CardUserCardNotesDialogComponent,
          new DialogConfig({
            title: 'Notes',
            data: {
              notes: this.item.notes,
            },
          })
        );
        ref.afterClosed.subscribe((data) => {
          if (data) {
            this.item.notes = data.notes;
            this.updated.emit(this.item);
          }
        });
      },
    });

    // Button remove
    this.buttonRemove = new Button({
      text: 'Remove',
      icon: Icons.trash,
      width: '100%',
      classes: 'secondary square-left',
      click: () => {
        if (confirm('Are you sure you want to delete this item?')) {
          this.deleted.emit(true);
        }
      },
    });
  }

  setupSubscriptions() {
    // Add group
    this.userCardGroupService
      .addUserCardGroupObservable()
      .subscribe((userCardGroup) => {
        if (userCardGroup) {
          this.dialogAddGroup.close();
          this.userCardGroupService.getUserCardGroups(
            new APIGetPaged({
              user_id: this.authenticationService.currentUserValue?.id,
              page_size: 100,
            })
          );
        }
      });
  }

  setupSelectGroupOptions() {
    if (this.selectGroup) {
      this.selectGroup.options = this.userCardGroups
        ? this.userCardGroups?.map((userCardGroup) =>
            this.item.card_groups[0] instanceof Object
              ? new SelectOption({
                  text: userCardGroup.name,
                  value: userCardGroup.id?.toString(),
                  selected: this.item.card_groups
                    .map((userCardGroup) => (userCardGroup as UserCard).id)
                    .includes(userCardGroup.id),
                })
              : new SelectOption({
                  text: userCardGroup.name,
                  value: userCardGroup.id?.toString(),
                  selected: this.item.card_groups
                    .map((userCardGroup) => userCardGroup as Number)
                    .includes(userCardGroup.id),
                })
          )
        : [];
    }
  }
}
