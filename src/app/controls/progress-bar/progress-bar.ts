export class ProgressBar {
	total: number;
	value: number;

    constructor(init?:Partial<ProgressBar>) {
		Object.assign(this, init);
	}
}