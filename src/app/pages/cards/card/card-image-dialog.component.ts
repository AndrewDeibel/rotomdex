import { DialogConfig, DialogRef } from '@app/controls/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'card-image-dialog',
  template: `<div class="card-image {{ config.data.gfx ? 'gfx' : '' }}">
    <img
      src="{{ config.data.image }}"
      onerror="this.src='./assets/placeholder.png';"
    />
  </div>`,
})
export class CardImageDialogComponent {
  constructor(public config: DialogConfig, public dialog: DialogRef) {}
}
