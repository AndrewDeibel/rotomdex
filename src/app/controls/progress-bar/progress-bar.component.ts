import { Component, OnInit, Input } from '@angular/core';
import { ProgressBar } from './progress-bar';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() progressBar: ProgressBar;

  getWidth = () => {
    if (this.progressBar.total > 0)
      return `${Math.round(
        (this.progressBar.value / this.progressBar.total) * 100
      )}%`;
    return '0%';
  };

  isComplete = () => {
    return this.progressBar.value >= this.progressBar.total;
  };

  constructor() {}

  ngOnInit() {}
}
