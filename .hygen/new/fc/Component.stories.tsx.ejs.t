---
to: <%= abs_path %>/<%= component_name %>.stories.tsx
---
import React from "react";
import { <%= component_name %> } from "./<%= component_name %>";
import { ComponentStory, ComponentMeta } from "@storybook/react";

/** props ↓ */
const props = {}

const Template: ComponentStory<typeof <%= component_name %>> = (args) => <<%= component_name %> {...args} />;

/** プロパティ ↓ */
export default {
  title: "<%= component_name %>", // 左側のサイドバーに記載されるコンポーネントの名前
}

/** パターンごとに表示するユースケースがあれば以下に追加 ↓ */
export const Primary = Template.bind({});
Primary.args = {
  // propsを記載
}
