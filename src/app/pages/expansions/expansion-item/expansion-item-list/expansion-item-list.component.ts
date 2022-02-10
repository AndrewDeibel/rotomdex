import { ProgressBar } from './../../../../controls/progress-bar/progress-bar';
import { Component, OnInit, Input } from '@angular/core';
import { Expansion } from '../../expansion/expansion';

@Component({
  selector: 'expansion-item-list',
  templateUrl: 'expansion-item-list.component.html',
  styleUrls: ['./expansion-item-list.component.scss'],
})
export class ExpansionItemListComponent implements OnInit {
  @Input() expansion: Expansion;

  progressBar: ProgressBar;

  constructor() {}

  ngOnInit() {
    this.progressBar = new ProgressBar({
      value: this.expansion.total_cards_owned,
      total: this.expansion.total_cards,
    });
  }
}
