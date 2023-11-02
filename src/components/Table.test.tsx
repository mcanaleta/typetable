import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Table } from "./Table";

describe("Running Test for Table", () => {
  test("Table renders correctly", () => {
    const data = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];

    render(<Table data={data} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });
});
