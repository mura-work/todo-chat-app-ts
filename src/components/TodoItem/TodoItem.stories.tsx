import React from "react";
import { TodoItem } from "./TodoItem";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TodoType } from "../../types/index";

const todo: TodoType = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "サンプル3",
  content: "これはサンプル3のタスクです",
  completedDate: new Date(),
  responsibleUserName: "ユーザー1",
  isDone: true,
  categories: [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "趣味",
      isValid: true,
      color: "green",
      todoLists: [],
    },
  ],
};

const updateTodoCompleted = async (id: number, checked: boolean) => {
  todo.isDone = checked;
};

/** props ↓ */
const props = {
  todo,
  updateTodoCompleted,
};

const Template: ComponentStory<typeof TodoItem> = (args) => (
  <TodoItem {...args} />
);

/** プロパティ ↓ */
export default {
  title: "TodoItem", // 左側のサイドバーに記載されるコンポーネントの名前
};

/** パターンごとに表示するユースケースがあれば以下に追加 ↓ */
export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
