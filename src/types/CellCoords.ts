export class CellCoords {
  public readonly id: string;
  constructor(public readonly row: number, public readonly col: number) {
    this.id = `${row},${col}`;
  }

  equals(cell?: CellCoords) {
    if (!cell) {
      return false;
    }
    return this.row === cell.row && this.col === cell.col;
  }

  add(cell: CellCoords) {
    return new CellCoords(this.row + cell.row, this.col + cell.col);
  }
}
