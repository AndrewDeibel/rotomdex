import { MBForm } from './../form/form';
import { Button } from '../button';

export class Dialog {
	title: string;
	buttons: Button[] = [];
	component: any;
	content: string;
	active: boolean;
	form: MBForm;
	autoOpen: boolean = true;
	close = () => {
		this.active = false;
		if (this.onClose) this.onClose();
	};
	open = () => {
		this.active = true;
	};

	onOpen: () => void;
	onClose: () => void;

	public constructor(init?: Partial<Dialog>) {
		Object.assign(this, init);
		if (this.autoOpen) this.open();
	}
}
