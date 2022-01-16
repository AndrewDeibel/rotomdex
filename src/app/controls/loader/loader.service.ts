import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class LoaderService {

	private _itemsLoading: string[] = [];
	loading = new BehaviorSubject<boolean>(false);
	constructor() {}

	private _show() {
		if (this.loading.value != true)
			this.loading.next(true);
	}
	
	private _hide() {
		if (this.loading.value != false)
			this.loading.next(false);
	}

	update() {
		if (this._itemsLoading.length) {
			this._show();
		}
		else {
			this._hide();
		}
	}

	addItemLoading(key: string) {
		console.log(`Loading: ${key}`);
		this._itemsLoading.push(key);
		this.update();
	}

	clearItemLoading(key: string) {
		console.log(`Done Loading: ${key}`);
		this._itemsLoading = this._itemsLoading.filter(item => {
			return item !== key;
		});
		this.update();
	}

	clear() {
		this._itemsLoading = [];
		this.update();
	}

}