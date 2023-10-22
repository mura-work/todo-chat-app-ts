import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TodoType } from "../../types/index";

const todoItem: TodoType = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "サンプル3",
  content: "これはサンプル3のタスクです",
  completedDate: new Date(),
  responsibleUserName: "ユーザー1",
  isDone: false,
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
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "仕事",
      isValid: true,
      color: "red",
      todoLists: [],
    },
  ],
};

// コンポーネントでありメソッドではないので先頭は大文字にする
function TodoItemComponent({ ...args }) {
  const [todo, setTodo] = useState<TodoType>(args.todo);

  const updateTodoCompleted = (id: number, checked: boolean) => {
    setTodo((prev) => ({ ...prev, isDone: checked }));
  };

  const deleteTodo = (id: number) => {
    alert(`id：${id}のタスクを削除しました`);
  };
  return (
    <TodoItem
      todo={todo}
      updateTodoCompleted={updateTodoCompleted}
      disabled={args.disabled}
      deleteTodo={deleteTodo}
    />
  );
}

export const Primary = {
  args: {
    todo: todoItem,
  },
  render: TodoItemComponent,
};

export const NoCategories = {
  args: {
    todo: {
      ...todoItem,
      categories: [],
    },
  },
  render: TodoItemComponent,
};

export const Disabled = {
  args: {
    todo: todoItem,
    disabled: true,
  },
  render: TodoItemComponent,
};

export const Done = {
  args: {
    todo: {
      ...todoItem,
      isDone: true,
    },
  },
  render: TodoItemComponent,
};

/** プロパティ ↓ */
export default {
  title: "TodoItem", // 左側のサイドバーに記載されるコンポーネントの名前
};
