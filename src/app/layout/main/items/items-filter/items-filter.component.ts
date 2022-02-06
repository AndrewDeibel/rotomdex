import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu, MenuItem } from '@app/controls/menu';
import { Icons } from '@app/models/icons';
import { ItemDisplayType, ItemsFilter } from './items-filter';

@Component({
  selector: 'items-filter',
  templateUrl: 'items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent implements OnInit {
  @Input() itemsFilter: ItemsFilter;
  @Output() outputGetItems: EventEmitter<string> = new EventEmitter();
  @Output() outputSearchChanged: EventEmitter<string> = new EventEmitter();
  @Output() outputSortByChanged: EventEmitter<string> = new EventEmitter();
  @Output() outputSortDirectionChanged: EventEmitter<string> =
    new EventEmitter();
  @Output() outputDisplayModeChanged: EventEmitter<ItemDisplayType> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.setupDefaultControls();
  }

  setupDefaultControls() {
    // Search
    this.itemsFilter.textboxSearch.keydownEnter = (value) => {
      this.outputSearchChanged.emit(value);
      this.outputGetItems.emit();
    };
    this.itemsFilter.textboxSearch.clickIcon = (value) => {
      this.outputGetItems.emit();
    };
    this.itemsFilter.textboxSearch.clickClear = () => {
      this.outputGetItems.emit();
    };

    // Sort by
    this.itemsFilter.selectSortBy.change = (value) => {
      this.outputSortByChanged.emit(value);
      this.outputGetItems.emit();
    };

    // Sort direction
    this.itemsFilter.selectSortDirection.change = (value) => {
      this.outputSortDirectionChanged.emit(value);
      this.outputGetItems.emit();
    };

    // Display modes
    this.itemsFilter.menuDisplayMode = new Menu({
      clearActiveClickOutside: false,
      horizontal: true,
      classes: 'round border shadow-light',
    });

    // Grid
    if (this.itemsFilter.showGridDisplayMode) {
      this.itemsFilter.menuItemGridDisplayMode = new MenuItem({
        text: 'Grid',
        icon: Icons.grid,
        active: this.itemsFilter.displayMode == ItemDisplayType.grid,
        click: () => {
          this.setDisplayMode(ItemDisplayType.grid);
        },
      });
      this.itemsFilter.menuDisplayMode.items.push(
        this.itemsFilter.menuItemGridDisplayMode
      );
    }

    // List
    if (this.itemsFilter.showListDisplayMode) {
      this.itemsFilter.menuItemListDisplayMode = new MenuItem({
        text: 'List',
        icon: Icons.list,
        active: this.itemsFilter.displayMode == ItemDisplayType.list,
        click: () => {
          this.setDisplayMode(ItemDisplayType.list);
        },
      });
      this.itemsFilter.menuDisplayMode.items.push(
        this.itemsFilter.menuItemListDisplayMode
      );
    }
  }

  setDisplayMode(type: ItemDisplayType) {
    this.outputDisplayModeChanged.emit(type);
    this.itemsFilter.setDisplayMode(type);
    this.itemsFilter.displayMode = type;
  }
}
