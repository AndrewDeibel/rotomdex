import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Checkbox } from './checkbox';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  constructor() {}

  click = (e: MouseEvent) => {
    e.stopPropagation();
  };

  onChange: any = () => {};
  onTouched: any = () => {};
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
  writeValue(checked: boolean) {
    this.value = checked;
  }
  get value() {
    return this.checkbox.checked;
  }
  set value(_value) {
    this.checkbox.checked = _value;
    this.onChange(_value);
    this.onTouched();
  }

  @Input() checkbox: Checkbox = new Checkbox();
}
