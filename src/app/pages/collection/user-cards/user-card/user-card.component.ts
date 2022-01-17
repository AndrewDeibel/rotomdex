import { UserCardGroup } from './../../../cards/card/card';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Condition,
  ConditionGraded,
  GradingCompany,
  Icons,
  Printings,
} from '@app/models';
import { Dialog, FormControl, FormControlGroup, Textarea } from '@app/controls';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, SelectOption, SelectOptionGroup } from '@app/controls/select';
import { Button } from '@app/controls/button';
import { UserCard } from './user-card';
import { DialogService } from '@app/controls/dialog';
import { Form } from '@app/controls/form';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() item: UserCard;
  @Input() userCardGroups: UserCardGroup[];
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  @Output() updated: EventEmitter<UserCard> = new EventEmitter();
  selectCondition: Select;
  selectGradingCompany: Select;
  selectPrinting: Select;
  selectBinder: Select;
  buttonNotes: Button;
  buttonAdd: Button;
  buttonRemove: Button;
  formNotes: FormGroup;

  constructor(
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildControls();
  }

  buildControls() {
    // Notes
    this.formNotes = this.formBuilder.group({
      notesControl: [''],
    });

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
        var test =
          (Condition as any)[value.replace(' ', '')] ||
          (ConditionGraded as any)[value.replace(' ', '').replace('.', '')];
        this.updated.emit(
          new UserCard({
            ...this.item,
            condition: test,
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
      classes: 'square secondary',
      width: '100%',
      click: () => {
        this.dialogService.setDialog(
          new Dialog({
            title: 'Notes',
            form: new Form({
              formGroup: this.formNotes,
              groups: [
                new FormControlGroup({
                  controls: [
                    new FormControl({
                      //formControl: this.formNotes.controls.notesControl,
                      control: new Textarea({}),
                    }),
                  ],
                }),
              ],
            }),
          })
        );
      },
    });

    // Group
    this.selectBinder = new Select({
      classes: 'square',
      multiple: true,
      options: this.userCardGroups?.map(
        (userCardGroup) =>
          new SelectOption({
            text: userCardGroup.name,
            value: userCardGroup.id.toString(),
          })
      ),
    });

    // Button remove
    this.buttonRemove = new Button({
      icon: Icons.trash,
      classes: 'secondary square-left',
      click: () => {
        if (confirm('Are you sure you want to delete this item?')) {
          this.deleted.emit(true);
        }
      },
    });
  }
}
