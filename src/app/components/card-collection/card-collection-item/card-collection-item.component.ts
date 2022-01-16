import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Condition,
  ConditionGraded,
  GradingCompany,
  Icons,
  Printings,
} from '@app/models';
import {
  Dialog,
  FormComponent,
  MBFormControl,
  MBFormGroup,
  Textarea,
} from '@app/controls';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, SelectOption, SelectOptionGroup } from '@app/controls/select';

import { Button } from '@app/controls/button';
import { CardCollectionItem } from './card-collection-item';
import { DialogService } from './../../../controls/dialog/dialog.service';
import { MBForm } from './../../../controls/form/form';
import { Textbox } from '@app/controls/textbox';

@Component({
  selector: 'mb-card-collection-item',
  templateUrl: './card-collection-item.component.html',
  styleUrls: ['./card-collection-item.component.scss'],
})
export class CardCollectionItemComponent implements OnInit {
  @Input() item: CardCollectionItem;
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  @Output() updated: EventEmitter<CardCollectionItem> = new EventEmitter();
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
        this.updated.emit(
          new CardCollectionItem({
            ...this.item,
            condition: (Condition as any)[value],
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
      classes: 'square',
      optionGroups: [
        new SelectOptionGroup({
          label: 'Graded By',
        }),
      ],
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
      classes: 'square',
      optionGroups: [
        new SelectOptionGroup({
          label: 'Printing',
        }),
      ],
      change: (value) => {
        this.updated.emit(
          new CardCollectionItem({
            ...this.item,
            printing: (Printings as any)[value],
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
            form: new MBForm({
              formGroup: this.formNotes,
              groups: [
                new MBFormGroup({
                  controls: [
                    new MBFormControl({
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

    // Binder
    this.selectBinder = new Select({
      classes: 'square',
      multiple: true,
      options: [
        new SelectOption({
          text: 'Binder 1',
          value: 'binder1',
          selected: true,
        }),
      ],
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
