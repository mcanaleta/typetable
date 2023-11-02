import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";

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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Simple: Story = {
  args: {
    data: [
      { id: 1, name: "test" },
      { id: 2, name: "test2" },
      { id: 3, name: "test3" },
    ],
    editable: false,
    columns: [
      {
        name: "id",
        width: "5em",
      },
      {
        name: "name",
        width: "10em",
      },
    ],
  },
};
