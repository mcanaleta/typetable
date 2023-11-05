export class TableRow<T> {
  public originalFields: Record<string, any> = {};

  constructor(public data: T, public index: number) {}

  isModifiedField(name: string): boolean {
    return this.originalFields.hasOwnProperty(name);
  }

  setField(name: string, value: any): void {
    const dataAny = this.data as any;
    this.originalFields[name] = this.originalFields[name] || dataAny[name];
    dataAny[name] = value;
  }
}
