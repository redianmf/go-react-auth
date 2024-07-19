import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import InputText from "./InputText";

export const ActionsData = {
  onChange: fn(),
};

const meta: Meta<typeof InputText> = {
  component: InputText,
  title: "InputText",
  tags: ["autodocs"],
  args: {
    ...ActionsData,
  },
};
export default meta;
type IInputText = StoryObj<typeof InputText>;

export const Default: IInputText = {
  args: {
    field: "email",
    label: "Email",
  },
};

export const PasswordInput: IInputText = {
  args: {
    field: "password",
    label: "Password",
    passwordHelper: true,
  },
};

export const ErrorInput: IInputText = {
  args: {
    field: "email",
    label: "Email",
    errorText: "Invalid email",
  },
};
