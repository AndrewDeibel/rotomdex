import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ReleaseNote {
	title: string;
	version: string;
	content: string;
	date: Date;
}

@Injectable({ providedIn: 'root' })
export class ReleaseNotesServices {
	private _releaseNotes: ReleaseNote[] = [
		{
			title: 'Welcome to RotomDex',
			content: `Our first release is focused on delivering TCG information including expansion, card, and Pokemon data.
				We are ironing out initial project startup issue and refining the user interface for desktop and mobile.
				We plan to develop addition features including a card scanner and collection management in the future.
				If you run into any bugs or have suggestions for improvement we would love to hear from you via our contact from.`,
			version: '0.9.6',
			date: new Date('4/7/2021'),
		},
		{
			title: 'Our long-term goal',
			content: `We started building RotomDex after hearing from many friends and people within the Pokemon TCG community.
				We all want a better way to manage our ever growing collection of amazing cards!
				There are a few existing TCG collection management solutions, but nothing that stands out or has features for Pokemon fans.
				RotomDex is our solution to this desire, a mobile app and website that makes it easy to catalog every Pokemon card in your collection.`,
			version: '0.9.7',
			date: new Date('5/11/2021'),
		},
	];

	_releaseNotesSorted = this._releaseNotes.sort(
		(a, b) => <any>b.date - <any>a.date
	);

	constructor(private http: HttpClient) {}

	// Get release notes
	private allReleaseNotesSubject = new BehaviorSubject<ReleaseNote[]>([]);
	getReleaseNotesObservable() {
		this.allReleaseNotesSubject = new BehaviorSubject<ReleaseNote[]>([]);
		return this.allReleaseNotesSubject.asObservable();
	}
	getReleaseNotes() {
		this.allReleaseNotesSubject.next(this._releaseNotesSorted);
	}
}
