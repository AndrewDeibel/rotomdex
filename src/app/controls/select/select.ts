import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Size } from '@app/models';

export class Select {
  label: string;
  value: string;
  values: string[] = [];
  options: SelectOption[] = [];
  optionsVisible: SelectOption[] = [];
  optionGroups: SelectOptionGroup[] = [];
  optionGroupsVisible: SelectOptionGroup[] = [];
  classes: string;
  dark: boolean;
  multiple: boolean;
  advancedSelect: boolean = false;
  placeholder: string = 'Select option';
  open: boolean;
  searchValue: string;
  size: Size;
  change: (value: string) => void;

  getSelectedOptions = () => {
    const selectedOptions = this.options.filter((option) => option.selected);
    const selectedOptionGroupOptions = this.optionGroups
      .filter(
        (optionGroup) =>
          optionGroup.options.filter((option) => option.selected).length
      )
      .map((optionGroup) => {
        const selectedGroup = optionGroup.options.filter(
          (option) => option.selected
        );
        return selectedGroup && selectedGroup[0];
      });
    return [...selectedOptions, ...selectedOptionGroupOptions];
  };

  getUnselectedOptions = () =>
    this.options.filter(
      (option) =>
        !option.selected &&
        (!this.searchValue ||
          this.searchValue.length <= 0 ||
          option.text
            .toLocaleLowerCase()
            .includes(this.searchValue.toLocaleLowerCase()))
    );

  public constructor(init?: Partial<Select>) {
    Object.assign(this, init);
    this.optionGroupsVisible = this.optionGroups;
    this.optionsVisible = this.options;
  }
}

export class SelectOption {
  text: string;
  value: string;
  selected: boolean;
  icon: IconProp;

  public constructor(init?: Partial<SelectOption>) {
    Object.assign(this, init);
  }
}

export class SelectOptionGroup {
  label: string;
  options: SelectOption[] = [];

  public constructor(init?: Partial<SelectOptionGroup>) {
    Object.assign(this, init);
  }
}
