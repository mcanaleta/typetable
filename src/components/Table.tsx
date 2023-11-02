import React from "react";
import styled from "styled-components";
import { Column } from "./column";

const StyledTable = styled.table<TableProps>`
  border: 1;
  border-collapse: collapse;
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

const StyledTd = styled.td<{ $width?: string }>`
  border-color: lightgrey;
  border-style: solid;
  border-width: 1px;
  padding-inline: 5px;
  cursor: default;
  width: ${(props) => props.$width};
`;

export interface TableProps {
  /**
   * Table data
   */
  data: any[];

  /**
   * Table header
   */
  columns: Column[];

  editable: boolean;
}

/**
 * Table component
 */
export function Table(props: TableProps) {
  return (
    <StyledTable {...props}>
      <thead>
        {props.columns.map((column, index) => (
          <StyledTh key={index} $width={column.width}>
            {column.name}
          </StyledTh>
        ))}
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr key={index}>
            {props.columns.map((column, index) => (
              <StyledTd key={index} $width={column.width}>
                {row[column.name]}
              </StyledTd>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
