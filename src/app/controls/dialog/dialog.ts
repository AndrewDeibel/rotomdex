import { Form } from './../form/form';
import { Button } from '../button';
import { Observable, Subject } from 'rxjs';
import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';

export class Dialog {
  title: string;
  buttons: Button[] = [];
  component: any;
  content: string;
  active: boolean;
  form: Form;
  autoOpen: boolean = true;
  close = () => {
    this.active = false;
    if (this.onClose) this.onClose();
  };
  open = () => {
    this.active = true;
  };

  onOpen: () => void;
  onClose: () => void;

  public constructor(init?: Partial<Dialog>) {
    Object.assign(this, init);
    if (this.autoOpen) this.open();
  }
}

export class DialogRef {
  close(result?: any): void {
    this._afterClosed.next(result);
  }
  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
}

export class DialogInjector implements Injector {
  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  get(token: any, notFoundValue?: any): any;
  get(token: any, notFoundValue?: any, flags?: any) {
    const value = this.additionalTokens.get(token);

    if (value) return value;

    return this.injector.get<any>(token, notFoundValue);
  }
  constructor(
    private injector: Injector,
    private additionalTokens: WeakMap<any, any>
  ) {}
}

export class DialogConfig<D = any> {
  data?: D;
}
