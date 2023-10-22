import React, { useState, useEffect } from "react";
import { Button, Text, Checkbox } from "@chakra-ui/react";
import api from "../services/api";

type Todo = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content?: String;
  completed_date: Date;
  responsibleUsername?: string;
  isDone: boolean;
};

export const TodoListPage = () => {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    const res: Todo[] = await api.get("/todo_lists").then((r) => r.data);
    console.log(res);
    setTodoLists(res);
  };

  const postTodo = async () => {
    const res = await api
      .post("/todo_lists")
      .then((r) => {
        console.log(r);
        return r;
      })
      .catch((e) => console.log(e));
    console.log(res);
  };

  const updateTodoCompleted = async (id: number, checked: boolean) => {
    console.log({ checked });
    await api
      .put(`/todo/${id}`, {
        checked,
      })
      .then((r) => {
        setTodoLists((prev) =>
          prev.map((val) =>
            val.id === id ? { ...val, isDone: r.data.isDone } : val
          )
        );
      })
      .catch((r) => console.log("失敗", r));
  };
  return (
    <div>
      {todoLists.map((todo) => {
        return (
          <div key={todo.id} className="flex">
            <Checkbox
              isChecked={todo.isDone}
              onChange={(e) => updateTodoCompleted(todo.id, e.target.checked)}
            ></Checkbox>
            <Text fontSize="xl">{todo.title}</Text>
          </div>
        );
      })}
      <Button onClick={postTodo}>タスク追加</Button>
    </div>
  );
};
