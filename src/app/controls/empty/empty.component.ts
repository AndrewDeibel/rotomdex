import { Component, OnInit, Input } from '@angular/core';
import { Empty } from './empty';

@Component({
	selector: 'mb-empty',
	templateUrl: './empty.component.html',
	styleUrls: ['./empty.component.scss']
})

export class EmptyComponent implements OnInit {

	@Input() empty: Empty;

	constructor() { }

	ngOnInit(): void {
		
	}

}