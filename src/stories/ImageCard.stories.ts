import { ImageCard } from "@/components/common/image-card";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

const imageUrl =
  "https://storage.googleapis.com/zia-web-public/staging/products/8a70a707-c818-4498-990e-359a6487dd74/5fa7479b-42ae-42ae-99f4-eb2f981f7018.octet-stream";

const meta = {
  title: "Cards/ImageCard",
  component: ImageCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Flag: Story = {
  args: {
    imageUrl,
    lines: ["Line 1", "Line 2"],
    header: "Header",
    flag: "Flag Neurolabs",
    flagClassName: "bg-purple-500",
    className: "bg-white",
    id: "1",
  },
};

export const Lines: Story = {
  args: {
    id: "1",
    header: "Header",
    lines: ["Line 1"],
    className: "bg-white",
    imageUrl,
  },
};

export const ClassName: Story = {
  args: {
    id: "1",
    header: "Header",
    lines: ["Line 1"],
    className: "border-2 border-red-500 bg-white",
    imageUrl,
  },
};
