import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import {
  Component,
  Type,
  HostListener,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef,
} from '@angular/core';
import { DialogRef } from './dialog';
import { DialogConfig } from '.';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  // Refs
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;
  @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();
  public config: DialogConfig;

  // Close on escape key
  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dialogRef.close();
    }
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogRef: DialogRef
  ) {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) this.componentRef.destroy();
  }

  onOverlayClicked(): void {
    this.dialogRef.close();
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }

  onDialogClicked(event: MouseEvent): void {
    event.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  close(): void {
    this._onClose.next('');
  }
}
