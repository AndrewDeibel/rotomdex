import { DialogConfig, DialogRef } from '@app/controls/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'card-image-dialog',
  template: `<img class="card-image" src="{{ config.data.image }}" />`,
})
export class CardImageDialogComponent {
  constructor(public config: DialogConfig, public dialog: DialogRef) {}
}
