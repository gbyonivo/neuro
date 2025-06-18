import { Button } from "@/components/common/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

const meta = {
  title: "Buttons/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Children: Story = {
  args: {
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Button",
  },
};

export const ClassName: Story = {
  args: {
    children: "Button",
    className: "bg-red-500",
  },
};
