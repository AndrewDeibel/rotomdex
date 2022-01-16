// Angular
import { Component, OnInit, Input } from '@angular/core';
import { Textbox } from '@app/controls';
import { Card } from '../../card/card';

@Component({
	selector: 'mb-card-item-grid',
	templateUrl: 'card-item-grid.component.html',
	styleUrls: ['./card-item-grid.component.scss']
})

export class CardItemGridComponent implements OnInit {

	@Input() card: Card;
	imageLoading: boolean = true;
	textbox: Textbox;
	values = [
		"0",
		"0",
		"0",
		"1",
		"2",
		"3",
	];

	constructor() { }

	ngOnInit() {
		this.textbox = new Textbox({
			type: "number",
			wrapperClasses: "small",
			value: this.values[Math.floor(Math.random() * this.values.length)],
			min: 0
		});
	}

	onLoad() {
		this.imageLoading = false;
	}
}