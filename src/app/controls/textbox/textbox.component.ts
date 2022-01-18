import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Alert } from '../alert';
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
  ],
})
export class TextboxComponent implements ControlValueAccessor {
  constructor() {}
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
  set value(_value) {
    this.textbox.value = _value;
    if (this.textbox.change) this.textbox.change(_value);
    this.onChange(_value);
    this.onTouched();
  }

  @Input() textbox: Textbox;
  @Input() alert: Alert;
  @Output() outputKeydownEnter: EventEmitter<string> = new EventEmitter();
  @Output() outputClickIcon: EventEmitter<string> = new EventEmitter();
  @Output() outputClickClear: EventEmitter<string> = new EventEmitter();

  click = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  keyup() {
    if (this.textbox.keyup) this.textbox.keyup(this.value);
  }

  keydown() {
    if (this.textbox.keydown) this.textbox.keydown(this.value);
  }

  keydownEnter() {
    this.outputKeydownEnter.emit(this.value);
    if (this.textbox.keydownEnter) this.textbox.keydownEnter(this.value);
  }

  clickIcon() {
    this.outputClickIcon.emit(this.value);
    if (this.textbox.clickIcon) this.textbox.clickIcon(this.value);
  }

  clickClear() {
    this.textbox.clear();
    this.outputClickClear.emit(this.value);
    if (this.textbox.clickClear) this.textbox.clickClear();
  }

  setPreviousValue() {
    this.value = this.previousValue;
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

  change(event?: any) {
    // If valid
    if (this.validate()) this.value = event?.currentTarget?.value;
    else this.setPreviousValue();

    // Set previous value after change
    this.previousValue = this.value;
  }

  colorPickerChange(value: string) {
    this.textbox.value = value;
    this.change();
  }
}
