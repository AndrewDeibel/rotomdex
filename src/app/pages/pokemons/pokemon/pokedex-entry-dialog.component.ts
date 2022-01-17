import { DialogRef } from '@app/controls/dialog';
import { Component } from '@angular/core';
import { DialogConfig } from '@app/controls';

@Component({
  selector: 'pokedex-entry-dialog',
  template: `{{ config.data }}`,
})
export class PokedexEntryDialogComponent {
  constructor(public config: DialogConfig, public dialog: DialogRef) {}
}
