export class ItemGroup {
	name: string;
	progress?: number;
	total_cards?: number;
	items: any[] = [];
	constructor(init?:Partial<ItemGroup>) {
		Object.assign(this, init);
	}
}