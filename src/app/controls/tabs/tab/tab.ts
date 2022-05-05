export class Tab {
  @Input() tabTitle: string;

  constructor(tabs: Tabs) {
    tabs.addTab(this);
  }
}
