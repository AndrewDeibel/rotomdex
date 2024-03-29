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
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  writeValue(event: any) {
    this.value = event;
  }
  setDisabledState(isDisabled: boolean) {
    this.toggle.disabled = isDisabled;
  }
  get value() {
    return this.toggle.checked;
  }
  set value(value) {
    this.toggle.checked = value;
    if (this.toggle.change) this.toggle.change(value);
    this.onChange(value);
    this.onTouched();
  }

  @Input() toggle: Toggle;

  change(event?: any) {
    this.value = event?.currentTarget?.checked;
  }
}
