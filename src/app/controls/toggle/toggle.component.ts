import { Component, Input, forwardRef } from '@angular/core';
import { Toggle } from './toggle';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'toggle',
  templateUrl: 'toggle.component.html',
  styleUrls: ['./toggle.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
})
export class ToggleComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
  writeValue(event: any) {
    this.value = event;
  }
  get value() {
    return this.toggle.checked;
  }
  set value(_value) {
    this.toggle.checked = _value;
    this.onChange(_value);
    this.onTouched();
  }

  @Input() toggle: Toggle;

  constructor() {}

  change() {}
}
