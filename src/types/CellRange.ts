import { CellCoords } from "./CellCoords";

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

export class CellRange {
  public readonly row0: number;
  public readonly col0: number;
  public readonly row1: number;
  public readonly col1: number;
  public cellsRightBorder: Set<string> = new Set();
  public cellsBottomBorder: Set<string> = new Set();
  public cellsLeftBorder: Set<string> = new Set();
  public cellsTopBorder: Set<string> = new Set();
  constructor(public start: CellCoords, public end: CellCoords) {
    this.row0 = Math.min(start.row, end.row);
    this.col0 = Math.min(start.col, end.col);
    this.row1 = Math.max(start.row, end.row);
    this.col1 = Math.max(start.col, end.col);
    this.cellsRightBorder = new Set(
      range(this.row0, this.row1)
        .map((row) => [`${row},${this.col1}`, `${row},${this.col0 - 1}`])
        .flat()
    );
    this.cellsBottomBorder = new Set(
      range(this.col0, this.col1)
        .map((col) => [`${this.row1},${col}`, `${this.row0 - 1},${col}`])
        .flat()
    );
    this.cellsLeftBorder = new Set(
      range(this.row0, this.row1).map((row) => `${row},${this.col0}`)
    );
    this.cellsTopBorder = new Set(
      range(this.col0, this.col1).map((col) => `${this.row0},${col}`)
    );
  }

  contains(cell: CellCoords) {
    return (
      this.row0 <= cell.row &&
      cell.row <= this.row1 &&
      this.col0 <= cell.col &&
      cell.col <= this.col1
    );
  }

  inRowRange(cell: CellCoords) {
    return this.row0 <= cell.row && cell.row <= this.row1;
  }

  inColRange(cell: CellCoords) {
    return this.col0 <= cell.col && cell.col <= this.col1;
  }

  rowsRange() {
    return range(this.row0, this.row1);
  }
  colsRange() {
    return range(this.col0, this.col1);
  }
  numRows() {
    return this.row1 - this.row0 + 1;
  }
}
