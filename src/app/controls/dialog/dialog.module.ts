import { InsertionDirective } from './insertion.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from '.';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent, InsertionDirective],
  entryComponents: [DialogComponent],
})
export class DialogModule {}
