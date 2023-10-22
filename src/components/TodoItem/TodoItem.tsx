import React from "react";
import styled from "styled-components";
import { Checkbox, Text, Badge, IconButton } from "@chakra-ui/react";
import { TodoType } from "../../types/index";
import { DeleteIcon } from "@chakra-ui/icons";

/** propsを記述 ↓ */
export type Props = {
  todo: TodoType;
  disabled?: boolean;
  updateTodoCompleted: (id: number, checked: boolean) => void;
  deleteTodo: (id: number) => void;
};

/** Styled-Component（css）を記述 ↓ */
const TodoItemRoot = styled.div`
  // write css
`;

/** コンポーネントを記述 ↓ */
export const TodoItem: React.FC<Props> = (props) => {
  const { todo, disabled, updateTodoCompleted, deleteTodo } = props;
  // const lineThroughCss = `${todo.isDone ? "line-through" : ""}`

  return (
    <TodoItemRoot className="flex items-center">
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
      <div className="ml-2">
        <IconButton
          variant="unstyled"
          className="!min-w-0 !min-h-0"
          aria-label="Search database"
          icon={<DeleteIcon />}
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    </TodoItemRoot>
  );
};
