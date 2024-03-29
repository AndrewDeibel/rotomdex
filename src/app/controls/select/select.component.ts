import { Button } from '@app/controls/button';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
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
export class SelectComponent implements ControlValueAccessor, OnInit {
  constructor() {}

  buttonAdd: Button;
  ngOnInit(): void {
    if (this.select.multiple && this.select.add) {
      this.buttonAdd = new Button({
        icon: Icons.plus,
        classes: 'secondary square',
        click: () => {
          this.select.add();
        },
      });
    }
  }

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
    if (value && value.length) {
      this.select.options.forEach((option) => {
        option.selected = option.value === value;
      });
      this.select.optionGroups.forEach((group) => {
        group.options.forEach((option) => {
          option.selected = option.value === value;
        });
      });
    }
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
    classes: 'width-12',
    wrapperClasses: 'width-12',
    preventDefault: true,
    keyup: (value) => {
      this.select.searchValue = value;
    },
    keydownEnter: (value) => {
      this.select.search(value);
    },
  });

  click() {
    if (
      // Not open
      !this.select.open &&
      // No value or multiple values allowed
      (this.select.multiple ||
        !this.select.value ||
        !this.select.value?.length ||
        // Or available options or show empty search
        this.select.getUnselectedOptions().length > 0 ||
        (this.select.multiple && this.select.showEmptySearch))
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
    if (this.select.multiple) {
      let values = this.value ? this.value.split(',') : [];
      if (!values.includes(option.value)) {
        values.push(option.value);
        this.value = values.join(',');
      }
    } else {
      this.value = option.value;
    }
    this.select.updateValues();
    this.select.setSelectedOptions();
  }

  unselectOption(option: SelectOption) {
    let values = this.value ? this.value.split(',') : [];
    if (values.length && values.includes(option.value)) {
      values = values.filter((value) => value !== option.value);
      this.value = values.join(',');
    } else {
      this.value = this.value;
    }
    this.select.updateValues();
    this.select.setSelectedOptions();
  }
}
