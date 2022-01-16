import { Component, OnInit, Input } from '@angular/core';
import { Expansion } from '../../expansion/expansion';

@Component({
	selector: 'mb-expansion-item-list',
	templateUrl: 'expansion-item-list.component.html',
	styleUrls: ['./expansion-item-list.component.scss']
})

export class ExpansionItemListComponent implements OnInit {

	@Input() expansion: Expansion;
	
	constructor() { }

	ngOnInit() { }
}