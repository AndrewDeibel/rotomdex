import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Textbox } from './textbox';

@Component({
  selector: 'textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true,
    },
  ],
})
export class TextboxComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  writeValue(value: string) {
    this.value = value;
  }
  setDisabledState(isDisabled: boolean) {
    this.textbox.disabled = isDisabled;
  }
  previousValue: string;
  get value() {
    return this.textbox.value;
  }
  set value(value) {
    this.textbox.value = value;
    if (this.textbox.change) this.textbox.change(value);
    this.onChange(value);
    this.onTouched();
  }

  @Input() textbox: Textbox;
  click = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  keyup(e: any) {
    if (this.textbox.keyup) {
      this.textbox.keyup(this.value);
    }
  }

  keydown(e: any) {
    this.value = e.target?.value;
    if (this.textbox.keydown) {
      this.textbox.keydown(this.value);
    }
  }

  keydownEnter(e: any) {
    this.value = e.target?.value;
    if (this.textbox.keydownEnter) this.textbox.keydownEnter(this.value);
  }

  clickIcon() {
    if (this.textbox.clickIcon) this.textbox.clickIcon(this.value);
  }

  clickClear() {
    this.textbox.clear();
    if (this.textbox.clickClear) this.textbox.clickClear();
  }

  validate() {
    this.textbox.valid = true;

    // If max, check it
    if (this.textbox.max) {
      const num = Number(this.value);

      // Not a number
      if (isNaN(num)) {
        this.textbox.valid = false;
      }

      // No large
      if (num > this.textbox.max) {
        this.textbox.valid = false;
      }
    }

    // If min, check it
    if (this.textbox.min) {
      const num = Number(this.value);

      // Not a number
      if (isNaN(num)) {
        this.textbox.valid = false;
      }

      // No large
      if (num < this.textbox.min) {
        this.textbox.valid = false;
      }
    }

    return this.textbox.valid;
  }

  change(e?: any) {
    // If valid
    if (this.validate()) this.value = e?.target?.value;
    else this.value = this.previousValue;

    // Set previous value after change
    this.previousValue = this.value;
  }

  colorPickerChange(value: string) {
    this.textbox.value = value;
    this.change();
  }
}
