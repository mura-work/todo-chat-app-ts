import React from "react";
import renderer from "react-test-renderer";
import { TodoItem } from "./TodoItem";
import { TodoType } from "../../types/index";

// snapshotテストを行う
// 値はPropsで渡すため、コンポーネント内でビジネスロジックは持たない（organismは除く）

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
      slug: "hobby",
      todoLists: [],
    },
  ],
};

const updateTodoCompleted = async (id: number, checked: boolean) => {
  todo.isDone = checked;
};

const deleteTodo = () => {};

describe("TodoItem", () => {
  it("Snap Shot", () => {
    const component = renderer.create(
      <TodoItem
        todo={todo}
        updateTodoCompleted={updateTodoCompleted}
        disabled={false}
        deleteTodo={deleteTodo}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
