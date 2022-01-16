import { Select } from '@app/controls/select';
import { Button } from '@app/controls/button';
import { Textbox } from '@app/controls/textbox';

export class ItemsFooter {
	// Values
	page: number = 1;
	pageSize: number = 24;
	totalPages: number;
	totalItems: number;

	// Controls
	selectPageSize: Select = new Select();
	buttonPrev: Button = new Button({
		classes: 'square-right',
	});
	buttonNext: Button = new Button({
		classes: 'square-left',
	});
	textboxPage: Textbox = new Textbox({
		classes: 'square',
	});

	_this: any;
	getItems: (_this: any) => void;

	constructor(init?: Partial<ItemsFooter>) {
		Object.assign(this, init);
	}
}
