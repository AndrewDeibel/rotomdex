import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption, SelectOptionGroup } from '@app/controls/select';
import { Icons } from '@app/models/icons';
import { ItemsFooter } from './items-footer';

@Component({
  selector: 'items-footer',
  templateUrl: 'items-footer-component.html',
  styleUrls: ['./items-footer-component.scss'],
})
export class ItemsFooterComponent implements OnInit {
  @Input() itemsFooter: ItemsFooter;

  @Output() outputGetItems: EventEmitter<void> = new EventEmitter();
  @Output() outputPageSizeChanged: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.setupDefaultControls();
    this.setupDefaultControlAttributes();
  }

  setupDefaultControls() {
    // Page
    this.itemsFooter.textboxPage.value = this.itemsFooter.page.toString();
    this.itemsFooter.textboxPage.max = this.itemsFooter.totalPages;
    this.itemsFooter.textboxPage.change = (value) => {
      this.itemsFooter.page = +value;
      this.outputGetItems.emit();
    };

    // Page size
    this.itemsFooter.selectPageSize.value =
      this.itemsFooter.pageSize.toString();
    this.itemsFooter.selectPageSize.change = (value) => {
      this.itemsFooter.pageSize = +value;
      this.itemsFooter.page = 1;
      this.itemsFooter.textboxPage.value = this.itemsFooter.page.toString();
      this.outputPageSizeChanged.emit(this.itemsFooter.page);
      this.outputGetItems.emit();
    };

    // Prev
    this.itemsFooter.buttonPrev.click = () => {
      this.itemsFooter.page--;
      this.itemsFooter.textboxPage.value = this.itemsFooter.page.toString();
      this.outputGetItems.emit();
    };

    // Next
    this.itemsFooter.buttonNext.click = () => {
      this.itemsFooter.page++;
      this.itemsFooter.textboxPage.value = this.itemsFooter.page.toString();
      this.outputGetItems.emit();
    };
  }

  setupDefaultControlAttributes() {
    // Prev/next
    this.itemsFooter.buttonPrev.icon = Icons.arrowLeft;
    this.itemsFooter.buttonNext.icon = Icons.arrowRight;

    // Page size
    this.itemsFooter.selectPageSize.optionGroups = [
      new SelectOptionGroup({
        label: 'Page Size',
        options: [
          new SelectOption({
            text: '12',
            value: '12',
          }),
          new SelectOption({
            text: '24',
            value: '24',
          }),
          new SelectOption({
            text: '60',
            value: '60',
          }),
          new SelectOption({
            text: '100',
            value: '100',
          }),
        ],
      }),
    ];
    this.itemsFooter.selectPageSize.value =
      this.itemsFooter.pageSize.toString();

    // Page
    this.itemsFooter.textboxPage.type = 'number';
    this.itemsFooter.textboxPage.min = 1;
    this.itemsFooter.textboxPage.width = 64;
  }

  isPrevDisabled() {
    return this.itemsFooter.page <= 1;
  }

  isNextDisabled() {
    return this.itemsFooter.page >= this.itemsFooter.totalPages;
  }
}
