import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Textarea } from './textarea';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
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
  get value() {
    return this.textarea.value;
  }
  set value(value) {
    this.textarea.value = value;
    if (this.textarea.change) this.textarea.change(value);
    this.onChange(value);
    this.onTouched();
  }

  @Input() textarea: Textarea;

  keydown(e: any) {
    this.value = e.target?.value;
  }

  keydownEnter(e: any) {
    this.value = e.target?.value;
    if (this.textarea.keydownEnter) this.textarea.keydownEnter(this.value);
  }

  change(e?: any) {
    this.value = e?.target?.value;
  }
}
