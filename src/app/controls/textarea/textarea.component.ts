import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
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
  set value(_value) {
    this.textarea.value = _value;
    this.onChange(_value);
    this.onTouched();
  }

  @Input() textarea: Textarea;
  @Output() outputKeydownEnter: EventEmitter<string> = new EventEmitter();
  @Output() clickIcon: EventEmitter<string> = new EventEmitter();

  keydownEnter() {
    this.outputKeydownEnter.emit(this.value);
    if (this.textarea.keydownEnter) {
      this.textarea.keydownEnter(this.value);
    }
  }

  change() {
    if (this.textarea.change) {
      this.textarea.change(this.value);
    }
  }

  constructor() {}
}
