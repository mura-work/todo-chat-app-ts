import React from "react";
import { BaseDialog } from "./BaseDialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";

/** props ↓ */
const props = {}

const Template: ComponentStory<typeof BaseDialog> = (args) => <BaseDialog {...args} />;

/** プロパティ ↓ */
export default {
  title: "BaseDialog", // 左側のサイドバーに記載されるコンポーネントの名前
}

/** パターンごとに表示するユースケースがあれば以下に追加 ↓ */
export const Primary = Template.bind({});
Primary.args = {
  // propsを記載
}
