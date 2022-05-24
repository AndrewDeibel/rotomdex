import { Component, Input, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs.component';

@Component({
  selector: 'tab',
  template: `
    <div [hidden]="!active" class="tab-content {{ noPadding && 'padding-0' }}">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() title: string;
  @Input() active: boolean;
  @Input() noPadding: boolean;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }
}
