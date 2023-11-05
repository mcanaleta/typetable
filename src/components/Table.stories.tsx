import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Table, TableProps } from "./Table";
import {
  DecimalType,
  IntType,
  RefType,
  StringDateType,
  StringType,
} from "@mcanaleta/fieldtypes";

import { Genre, Movie, genres, movies } from "../stories/movies.data";
import { TableRow } from "../types/TableRow";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const keyBy = <T extends Record<string, any>>(arr: T[], key: keyof T) =>
  arr.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {});

function Template<T>(args: TableProps<T>) {
  // useState hook to simulate local state
  const [data, setData] = useState<TableRow<T>[]>(args.data);
  return <Table<T> {...args} data={data} setData={setData} />;
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FullExample: Story = {
  render: Template,
  args: {
    data: movies.map((movie, i) => new TableRow(movie, movie.id) as any as any),
    columns: [
      {
        name: "id",
        width: "5em",
        type: new IntType(),
      },
      {
        name: "name",
        width: "10em",
        type: new StringType(),
      },
      {
        name: "genre",
        width: "10em",
        type: new RefType<Genre>(
          genres,
          (genre) => genre?.title,
          (genre) => "" + genre?.id
        ),
      },
      {
        name: "releaseDate",
        width: "10em",
        type: new StringDateType(),
      },
      {
        name: "revenue",
        width: "10em",
        type: new IntType(),
        align: "right",
      },
      {
        name: "rating",
        width: "10em",
        type: new DecimalType(),
        align: "center",
      },
      {
        name: "description",
        width: "40em",
        type: new StringType(),
      },
    ],
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Select: Story = {
  render: Template,
  args: {
    data: [
      {
        movie: 1,
      },
      { movie: 2 },
      { movie: 3 },
      { movie: 4 },
      { movie: 5 },
    ].map((movie, i) => new TableRow(movie, i) as any as any),
    columns: [
      {
        name: "movie",
        width: "20em",
        type: new RefType<Movie>(
          movies,
          (movie) => movie?.name,
          (movie) => "" + movie?.id
        ),
      },
    ],
  },
};
