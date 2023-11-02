import React from "react";
import styled from "styled-components";
import { TableProps } from "./Table.types";

const StyledTable = styled.table<TableProps>`
  border: 1;
`;

export default function Table(props: TableProps) {
  return (
    <StyledTable {...props}>
      <thead></thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr key={index}>
            <td>{JSON.stringify(row)}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
