import type { Meta, StoryObj } from "@storybook/react";
import { AlertType } from "../types/types";

import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Alert",
  tags: ["autodocs"],
};
export default meta;
type IAlert = StoryObj<typeof Alert>;

export const Default: IAlert = {
  args: {
    message: "This is default alert",
  },
};

export const Error: IAlert = {
  args: {
    message: "This is error alert",
    type: AlertType.ERROR,
  },
};

export const Warning: IAlert = {
  args: {
    message: "This is warning alert",
    type: AlertType.WARNING,
  },
};

export const Success: IAlert = {
  args: {
    message: "This is success alert",
    type: AlertType.SUCCESS,
  },
};
