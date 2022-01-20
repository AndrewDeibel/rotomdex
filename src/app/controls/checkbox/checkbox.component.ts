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
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  writeValue(checked: boolean) {
    this.value = checked;
  }
  get value() {
    return this.checkbox.checked;
  }
  set value(checked) {
    this.checkbox.checked = checked;
    if (this.checkbox.change) this.checkbox.change(checked);
    this.onChange(checked);
    this.onTouched();
  }

  @Input() checkbox: Checkbox = new Checkbox();

  change(event?: any) {
    this.value = event?.currentTarget?.checked;
  }
}
