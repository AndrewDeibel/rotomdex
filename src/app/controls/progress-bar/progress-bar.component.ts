import { Component, OnInit, Input } from '@angular/core';
import { ProgressBar } from './progress-bar';

@Component({
	selector: 'progress-bar',
	templateUrl: 'progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss']
})

export class ProgressBarComponent implements OnInit {

	@Input() progressBar: ProgressBar;
	
	getWidth = () => {
		return `${Math.round(this.progressBar.value/this.progressBar.total * 100)}%`;
	}

	isComplete = () => {
		return this.progressBar.value >= this.progressBar.total;
	}

	constructor() { }

	ngOnInit() { }
}