import React from "react";
import styled from "styled-components";
import { Checkbox, Text, Badge } from "@chakra-ui/react";
import { TodoType } from "../../types/index";

/** propsを記述 ↓ */
export type Props = {
  todo: TodoType;
  disabled?: boolean;
  updateTodoCompleted: (id: number, checked: boolean) => void;
};

/** Styled-Component（css）を記述 ↓ */
const TodoItemRoot = styled.div`
  // write css
`;

/** コンポーネントを記述 ↓ */
export const TodoItem: React.FC<Props> = (props) => {
  const { todo, disabled, updateTodoCompleted } = props;
  // const lineThroughCss = `${todo.isDone ? "line-through" : ""}`

  return (
    <TodoItemRoot className="flex">
      <Checkbox
        isChecked={todo.isDone}
        isDisabled={disabled}
        onChange={(e) => updateTodoCompleted(todo.id, e.target.checked)}
      ></Checkbox>
      <Text className="mx-2" fontSize="xl">
        {todo.title}
      </Text>
      <div>
        {todo.categories.map((category) => {
          return (
            <Badge
              key={category.id}
              className="px-1 mr-1"
              colorScheme={category.color}
            >
              {category.name}
            </Badge>
          );
        })}
      </div>
    </TodoItemRoot>
  );
};
