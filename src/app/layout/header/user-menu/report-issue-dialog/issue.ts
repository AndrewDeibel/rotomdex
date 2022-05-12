export class Issue {
  subject: string;
  message: string;
  screenshot: string;
  url: string;

  public constructor(init?: Partial<Issue>) {
    Object.assign(this, init);
  }
}
