import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { SuperInput, SuperInputProps } from "./SuperInput";
import { Movie, movies } from "../stories/movies.data";
import { useState } from "react";
import { DecimalType, RefType } from "@mcanaleta/fieldtypes";

const meta = {
  title: "Components/SuperInput",
  component: SuperInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SuperInput>;

export default meta;

type Story<T> = StoryObj<Meta<typeof SuperInput<T>>>;

function Template<T>(args: SuperInputProps<T>) {
  // useState hook to simulate local state
  const [value, setValue] = useState<T | null>(args.value);
  return <SuperInput<T> {...args} value={value} setValue={setValue} />;
}

export const Simple: Story<number> = {
  args: {
    value: 3,
    type: new DecimalType(),
    selectOnFocus: true,
  },
  render: Template,
};

export const Select: Story<string> = {
  args: {
    value: "" + movies[0].id,
    selectOnFocus: true,
    type: new RefType(
      movies,
      (movie: Movie) => movie?.name,
      (movie) => "" + movie?.id
    ),
  },
  render: Template,
};
