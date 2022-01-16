export class MBFormControl {
	control: any;
	classes: string;
	formControl: any;

	constructor(init?: Partial<MBFormControl>) {
		Object.assign(this, init);
	}
}
