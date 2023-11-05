import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Column } from "../types/TableColumn";
import { CellCoords } from "../types/CellCoords";
import { CellRange } from "../types/CellRange";
import { SuperInput } from "./SuperInput";
import { TableRow } from "../types/TableRow";

const StyledTable = styled.table`
  border: 1;
  border-collapse: collapse;
  row-gap: 0px;
`;

const StyledTh = styled.th<{ $width?: string }>`
  background-color: #f2f2f2;
  border-color: silver;
  border-style: solid;
  border-width: 1px;
  padding-inline: 5px;
  text-transform: uppercase;
  font-size: 0.8em;
  cursor: default;
  width: ${(props) => props.$width};
`;

const StyledTd = styled.td<{
  $width?: string;
  $active?: boolean;
  $selected?: boolean;
  $modified?: boolean;
  $rangeLeft?: boolean;
  $rangeRight?: boolean;
  $rangeTop?: boolean;
  $rangeBottom?: boolean;
}>`
  box-sizing: border-box;
  border-color: lightgrey;
  border-style: solid;
  border-width: 1px;
  border-left: ${(props) => (props.$rangeLeft ? "1.5px solid blue" : "")};
  border-right: ${(props) => (props.$rangeRight ? "1.5px solid blue" : "")};
  border-top: ${(props) => (props.$rangeTop ? "1.5px solid blue" : "")};
  border-bottom: ${(props) => (props.$rangeBottom ? "1.5px solid blue" : "")};
  border-collapse: collapse;
  vertical-align: middle;
  background-color: ${(props) =>
    props.$selected
      ? "rgb(240,240,255)"
      : props.$modified
      ? "rgb(255,255,128)"
      : "white"};
  width: ${(props) => props.$width};
  outline: none;
  height: 1%.5;
  user-select: none;
  &:focus-within {
    outline: 2px solid blue;
    outline-offset: -1px;
    border-color: rgb(0, 0, 220);
  }
`;

const StyledEditableInput = styled.input<{ $editing?: boolean }>`
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 100%;
  background-color: white;
  &:focus {
    outline: 3px solid blue;
    outline-offset: 2px;
    user-select: none;
  }
`;

const StyledReadonlyInput = styled.input`
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: default;
  &:focus {
    outline: none;
  }
  &::selection {
    background: transparent;
  }
`;

export interface TableProps<T> {
  /**
   * Table data
   */
  data: TableRow<T>[];

  /**
   * Table data setter
   */
  setData: (data: TableRow<T>[]) => void;

  /**
   * Table header
   */
  columns: Column<any>[];
}

/**
 * Table component
 */
export function Table<T>(props: TableProps<T>) {
  const [activeCell, setActiveCell] = useState<CellCoords>();
  const [range, setRange] = useState<CellRange>();
  const [selecting, setSelecting] = useState(false);
  const [editing, setEditing] = useState(false);
  const tbody = useRef<HTMLTableSectionElement>(null);
  const [lastEditTrigger, setLastEditTrigger] = useState<"type" | "other">();

  const fullRange = useMemo(
    () =>
      new CellRange(
        new CellCoords(0, 0),
        new CellCoords(props.data.length - 1, props.columns.length - 1)
      ),
    [props.data.length, props.columns.length]
  );

  function getInputElement(coords: CellCoords) {
    const tr = tbody.current?.children[coords.row];
    const td = tr?.children[coords.col];
    const input = td?.getElementsByTagName("input")[0];
    console.log({ coords, tbody, tr, td, input });
    return input;
  }

  async function paste(text: string) {
    if (!activeCell) return;
    const startCell = range
      ? new CellCoords(range.row0, range.col0)
      : activeCell;
    const numRows = Math.max(range?.numRows() || text.split("\n").length);
    const lines = text.split("\n");
    for (let i = 0; i < numRows; i++) {
      const line = lines[i % lines.length];
      console.log(`pasting line ${line}`);
      const cells = line.split("\t");
      cells.forEach((pasteCellValue, j) => {
        const col = startCell.col + j;
        const pasteCoord = startCell.add(new CellCoords(i, j));
        if (fullRange.contains(pasteCoord)) {
          const pasteValue = props.columns[col].type.parse(pasteCellValue);
          setValue(pasteCoord, pasteValue);
        }
      });
    }
  }

  function setValue(coords: CellCoords, value: any) {
    console.log("setting value", coords, value);
    const row = props.data[coords.row];
    const name = props.columns[coords.col].name;
    row.setField(name, value);
    const newRows = [...props.data];
    props.setData(newRows);
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <StyledTh key={index} $width={column.width}>
              {column.name}
            </StyledTh>
          ))}
        </tr>
      </thead>
      <tbody ref={tbody}>
        {props.data.map((row, irow) => (
          <tr key={irow}>
            {props.columns.map((column, icol) => {
              const coords = new CellCoords(irow, icol);
              const inRange = range?.contains(coords);
              const rangeDone = !selecting && range;
              const rowany = row.data as any;
              const value = rowany[column.name];
              const isActive = activeCell?.equals(coords) || false;
              const editingThisCell = editing && isActive;
              const options = editingThisCell && column.type.options();
              return (
                <StyledTd
                  key={icol}
                  $width={column.width}
                  $selected={inRange && !range?.start.equals(range?.end)}
                  $active={isActive}
                  $modified={row.isModifiedField(column.name)}
                  $rangeRight={
                    rangeDone && range.cellsRightBorder.has(coords.id)
                  }
                  $rangeBottom={
                    rangeDone && range.cellsBottomBorder.has(coords.id)
                  }
                  $rangeLeft={rangeDone && range.cellsLeftBorder.has(coords.id)}
                  $rangeTop={rangeDone && range.cellsTopBorder.has(coords.id)}
                  onMouseDown={(c) => {
                    setSelecting(true);
                    if (!selecting) {
                      if (c.shiftKey && activeCell) {
                        setRange(new CellRange(activeCell, coords));
                        c.preventDefault();
                      } else {
                        setRange(new CellRange(coords, coords));
                      }
                    }
                  }}
                  onMouseMove={(ev) => {
                    const buttonPressed = ev.buttons === 1;
                    if (selecting && activeCell) {
                      if (buttonPressed && !coords.equals(range?.end)) {
                        setSelecting(true);
                        setRange(new CellRange(activeCell, coords));
                      }
                    }
                  }}
                  onMouseUp={() => {
                    setSelecting(false);
                  }}
                  onPaste={(ev) => {
                    paste(ev.clipboardData.getData("text"));
                  }}
                  onDoubleClick={() => {
                    console.log("double click");
                    setLastEditTrigger("other");
                    setEditing(true);
                  }}
                  onKeyDown={(e) => {
                    if (editingThisCell) {
                      if (e.key == "Enter") {
                        const nextCell = activeCell?.add(new CellCoords(1, 0));
                        const input = nextCell && getInputElement(nextCell);
                        if (input) {
                          input.focus();
                        }
                      }
                    }
                  }}
                >
                  {editingThisCell ? (
                    <SuperInput
                      as={StyledEditableInput}
                      key="input-edit"
                      value={value}
                      type={column.type}
                      autoFocus
                      setValue={(value) => {
                        setValue(coords, value);
                      }}
                      selectOnFocus={lastEditTrigger == "type"}
                      onKeyDown={(e) => {
                        if (e.key == "Escape") {
                          e.currentTarget.value = value;
                          setEditing(false);
                          return;
                        } else if (e.key == "Enter") {
                          const nextCell = activeCell?.add(
                            new CellCoords(1, 0)
                          );
                          const input = nextCell && getInputElement(nextCell);
                          if (input) {
                            input.focus();
                          }
                        }
                      }}
                    />
                  ) : (
                    <StyledReadonlyInput
                      key="input-read"
                      value={column.type.display(value)}
                      readOnly
                      onFocus={(ev) => {
                        setRange(undefined);
                        if (!coords.equals(activeCell)) {
                          console.log("changing active cell");
                          setActiveCell(coords);
                          setEditing(false);
                        }
                      }}
                      onCopy={(ev) => {
                        const copyRange =
                          range || new CellRange(coords, coords);
                        const text = copyRange
                          .rowsRange()
                          .map((row) =>
                            copyRange
                              .colsRange()
                              .map(
                                (col) =>
                                  (props.data[row].data as any)[
                                    props.columns[col].name
                                  ]
                              )
                              .join("\t")
                          )
                          .join("\n");
                        console.log("copying", text);
                        navigator.clipboard.writeText(text || "");
                        ev.preventDefault();
                      }}
                      onKeyDown={(e) => {
                        // offset keys
                        if (e.key == "Enter") {
                          setLastEditTrigger("other");
                          setEditing(true);
                          return;
                        }

                        const offsets: Record<string, CellCoords> = {
                          ArrowDown: new CellCoords(1, 0),
                          ArrowUp: new CellCoords(-1, 0),
                          ArrowRight: new CellCoords(0, 1),
                          ArrowLeft: new CellCoords(0, -1),
                        };

                        const offset = offsets[e.key];
                        if (offset) {
                          if (activeCell && e.shiftKey) {
                            const nextCell = (range?.end || activeCell).add(
                              offset
                            );
                            if (fullRange.contains(nextCell))
                              setRange(new CellRange(activeCell, nextCell));
                          } else {
                            const nextCell = coords.add(offset);
                            if (fullRange.contains(nextCell)) {
                              const input = getInputElement(nextCell);
                              input?.focus();
                            }
                          }
                          e.preventDefault();
                          return;
                        }
                        // any printable key

                        const isPrintable = e.key.length === 1;
                        const noModifier =
                          !e.altKey && !e.ctrlKey && !e.metaKey;
                        if (isPrintable && noModifier) {
                          setEditing(true);
                          setLastEditTrigger("type");
                          e.stopPropagation();
                          return;
                        }
                      }}
                    />
                  )}
                </StyledTd>
              );
            })}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
