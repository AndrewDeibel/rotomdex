import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProgressBar } from '@app/controls/progress-bar/progress-bar';
import { ItemDisplayType } from '../items-filter';
import { ItemGroup } from './item-group';

@Component({
  selector: 'items-groups',
  templateUrl: 'items-groups.component.html',
  styleUrls: ['./items-groups.component.scss'],
})
export class ItemsGroupsComponent implements OnInit {
  @Input() groups: ItemGroup[];
  @Input() itemDisplayType: ItemDisplayType;
  @Input() itemClasses: string;
  @Output() outputClickItem: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getProgressBar(group: ItemGroup) {
    return new ProgressBar({
      value: group.progress,
      total: group.total_cards,
    });
  }

  showGrid(group: ItemGroup) {
    return group.items.length && this.itemDisplayType == ItemDisplayType.grid;
  }

  showList(group: ItemGroup) {
    return group.items.length && this.itemDisplayType == ItemDisplayType.list;
  }

  showEmpty(group: ItemGroup) {
    return group.items.length == 0;
  }

  clickItem(item: any) {
    this.outputClickItem.emit(item);
  }
}
