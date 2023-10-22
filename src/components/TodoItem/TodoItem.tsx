import React from "react";
import styled from "styled-components";
import { useDependencies } from "./dependencies";
import { Checkbox, Text, Badge } from "@chakra-ui/react";
import { TodoType } from "../../types/index";

/** propsを記述 ↓ */
export type Props = {
  todo: TodoType;
  updateTodoCompleted: (id: number, checked: boolean) => void;
};

/** Styled-Component（css）を記述 ↓ */
const TodoItemRoot = styled.div`
  // write css
`;

/** コンポーネントを記述 ↓ */
export const TodoItem: React.FC<Props> = (props) => {
  const { todo, updateTodoCompleted } = props;

  return (
    <TodoItemRoot className="flex">
      <Checkbox
        isChecked={todo.isDone}
        onChange={(e) => updateTodoCompleted(todo.id, e.target.checked)}
      ></Checkbox>
      <Text fontSize="xl">{todo.title}</Text>
      <Badge colorScheme={todo.categories[0].color}>テスト</Badge>
    </TodoItemRoot>
  );
};
