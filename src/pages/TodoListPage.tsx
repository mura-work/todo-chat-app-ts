import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import api from "../services/api";

type Todo = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content?: String;
  completed_date: Date;
  responsibleUsername?: string;
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
  return (
    <div>
      {todoLists.map((todo) => {
        return <div key={todo.id}>{todo.title}</div>;
      })}
      <Button onClick={postTodo}>タスク追加</Button>
    </div>
  );
};
