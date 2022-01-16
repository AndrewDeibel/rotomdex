import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { Dialog } from './dialog';

@Component({
	selector: 'mb-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

	@HostListener('window:keyup', ['$event'])
	keyUp(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.dialog.close();
		}
	}
	@Input() dialog: Dialog;
	loading: boolean;

	constructor(private elRef: ElementRef) { }

	ngOnInit(): void {
		
	}

}