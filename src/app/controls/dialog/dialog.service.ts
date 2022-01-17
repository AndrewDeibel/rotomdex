import { DialogModule } from './dialog.module';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { DialogComponent } from '.';
import { DialogRef, DialogConfig, DialogInjector } from './dialog';

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(componentType: Type<any>, config: DialogConfig): DialogRef {
    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;
    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogConfig): DialogRef {
    // Config
    const map = new WeakMap();
    map.set(DialogConfig, config);
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);
    // After close remove from body
    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });
    // Child component
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(
      new DialogInjector(this.injector, map)
    );
    // Inject into body
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    // Refs
    this.dialogComponentRef = componentRef;
    this.dialogComponentRef.instance.config = config;
    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });
    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  public closeAll(): void {
    this.removeDialogComponentFromBody();
  }
}
