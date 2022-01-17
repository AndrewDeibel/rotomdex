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

  constructor() {}

  ngOnInit() {}

  isTextbox() {
    return this.appFormControl.control instanceof Textbox;
  }
  isTextarea() {
    return this.appFormControl.control instanceof Textarea;
  }
  isSelect() {
    return this.appFormControl.control instanceof Select;
  }
  isEditor() {
    return this.appFormControl.control instanceof Editor;
  }
  isCheckbox() {
    return this.appFormControl.control instanceof Checkbox;
  }
  isToggle() {
    return this.appFormControl.control instanceof Toggle;
  }
}
