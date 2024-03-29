import { Component, OnInit, Input } from '@angular/core';
import { ProgressBar } from '@app/controls/progress-bar/progress-bar';
import { Expansion } from '../../expansion/expansion';

@Component({
  selector: 'expansion-item-grid',
  templateUrl: 'expansion-item-grid.component.html',
  styleUrls: ['./expansion-item-grid.component.scss'],
})
export class ExpansionItemGridComponent implements OnInit {
  @Input() expansion: Expansion;
  @Input() size: string;

  progressBar: ProgressBar;

  constructor() {}

  ngOnInit() {
    this.progressBar = new ProgressBar({
      value: this.expansion.total_cards_owned,
      total: this.expansion.total_cards_with_secrets,
    });
  }
}
