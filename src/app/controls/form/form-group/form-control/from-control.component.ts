import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from './form-control';
import { Textbox } from '@app/controls/textbox';
import { Editor } from '@app/controls/editor';
import { Textarea } from '@app/controls/textarea';
import { Select } from '@app/controls/select';
import { Checkbox } from '@app/controls/checkbox';
import { Toggle } from '@app/controls/toggle';

@Component({
  selector: 'form-control',
  templateUrl: 'form-control.component.html',
})
export class FormControlComponent implements OnInit {
  @Input() appFormControl: FormControl;
  showTextbox: boolean;
  showTextarea: boolean;
  showSelect: boolean;
  showEditor: boolean;
  showCheckbox: boolean;
  showToggle: boolean;

  constructor() {}

  ngOnInit() {
    this.showTextbox = this.appFormControl.control instanceof Textbox;
    this.showTextarea = this.appFormControl.control instanceof Textarea;
    this.showSelect = this.appFormControl.control instanceof Select;
    this.showEditor = this.appFormControl.control instanceof Editor;
    this.showCheckbox = this.appFormControl.control instanceof Checkbox;
    this.showToggle = this.appFormControl.control instanceof Toggle;
  }
}
