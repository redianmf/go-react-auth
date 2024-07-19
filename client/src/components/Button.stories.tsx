import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
};
export default meta;
type IButton = StoryObj<typeof Button>;

export const Default: IButton = {
  args: {
    children: "Submit",
  },
};

export const Disabled: IButton = {
  args: {
    children: "Submit",
    disabled: true,
  },
};
