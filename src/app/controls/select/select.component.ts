import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Textbox } from '@app/controls';
import { Icons, Size } from '@app/models';
import { Select, SelectOption } from './select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
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
  get value() {
    return this.select.value;
  }
  set value(value) {
    this.select.value = value;
    this.select.options.forEach((option) => {
      option.selected = option.value === value;
    });
    this.select.optionGroups.forEach((group) => {
      group.options.forEach((option) => {
        option.selected = option.value === value;
      });
    });
    if (this.select.change) this.select.change(this.select.value);
    this.onChange(value);
    this.onTouched();
  }

  @Input() select: Select;

  textboxSearch: Textbox = new Textbox({
    placeholder: 'Search...',
    type: 'search',
    icon: Icons.search,
    size: Size.small,
    keyup: (_value) => {
      this.select.searchValue = _value;
    },
  });

  click() {
    if (
      (this.select.multiple ||
        !this.select.value ||
        !this.select.value?.length) &&
      !this.select.open
    )
      this.select.open = true;
    else this.select.open = false;
  }

  clickOutside() {
    this.select.open = false;
  }

  change(event?: any) {
    this.value = event?.currentTarget?.value;
  }

  selectOption(option: SelectOption) {
    option.selected = true;
    let values = this.value ? this.value.split(',') : [];
    if (!values.includes(option.value)) {
      values.push(option.value);
      this.value = values.join(',');
    }
  }

  unselectOption(option: SelectOption) {
    option.selected = false;
    let values = this.value ? this.value.split(',') : [];
    if (values.includes(option.value)) {
      values = values.filter((value) => value !== option.value);
      this.value = values.join(',');
    }
  }
}
