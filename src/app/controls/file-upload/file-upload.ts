export class FileUpload {
  value: string = '';
  label: string;
  width: string;
  classes: string;
  disabled: boolean;
  readOnly: boolean;

  clear = () => {
    this.value = '';
  };

  public constructor(init?: Partial<FileUpload>) {
    Object.assign(this, init);
  }
}
