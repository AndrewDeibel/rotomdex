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

@Component({
  selector: 'card-user-card',
  templateUrl: './card-user-card.component.html',
  styleUrls: ['./card-user-card.component.scss'],
})
export class CardUserCardComponent implements OnInit {
  @Input() item: UserCard;
  @Input() userCardGroups: UserCardGroup[];
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  @Output() updated: EventEmitter<UserCard> = new EventEmitter();
  selectCondition: Select;
  selectGradingCompany: Select;
  selectPrinting: Select;
  selectGroup: Select;
  buttonNotes: Button;
  buttonAdd: Button;
  buttonRemove: Button;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.buildControls();
  }

  ngOnChanges(): void {
    // Group
    this.selectGroup = new Select({
      classes: 'square small-round-right',
      multiple: true,
      options: this.userCardGroups?.map(
        (userCardGroup) =>
          new SelectOption({
            text: userCardGroup.name,
            value: userCardGroup.id?.toString(),
          })
      ),
      change: (value) => {
        this.updated.emit(
          new UserCard({
            ...this.item,
            card_group_id: Number(value),
          })
        );
      },
    });
  }

  buildControls() {
    // Condition
    this.selectCondition = new Select({
      value: this.item.condition,
      classes: 'square-right',
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

    // Grading company
    this.selectGradingCompany = new Select({
      value: this.item.graded_by,
      classes: 'square',
      optionGroups: [
        new SelectOptionGroup({
          label: 'Graded By',
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
        })
      );
    }

    // Printing
    this.selectPrinting = new Select({
      value: this.item.printing,
      classes: 'square',
      optionGroups: [
        new SelectOptionGroup({
          label: 'Printing',
        }),
      ],
      change: (value) => {
        this.updated.emit(
          new UserCard({
            ...this.item,
            printing: (Printings as any)[value.replace(' ', '')],
          })
        );
      },
    });
    for (let printVersion in Printings) {
      this.selectPrinting.optionGroups[0].options.push(
        new SelectOption({
          text: (Printings as any)[printVersion],
          value: (Printings as any)[printVersion],
        })
      );
    }

    // Notes
    this.buttonNotes = new Button({
      text: 'Notes',
      icon: Icons.stickyNote,
      classes: 'square secondary small-round-left',
      width: '100%',
      click: () => {
        this.dialogService.open(
          CardUserCardNotesDialogComponent,
          new DialogConfig({
            title: 'Notes',
            data: {
              userCard: this.item,
            },
          })
        );
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
}