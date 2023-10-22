import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Input,
  Badge,
} from "@chakra-ui/react";
import api from "../services/api";
import { TodoType } from "../types/index";
import { TodoItem } from "components/TodoItem/TodoItem";

type TodoForm = {
  title: string;
  content?: string;
  completedDate: string;
  responsibleUserName?: string;
};

export const TodoListPage = () => {
  const [todoLists, setTodoLists] = useState<TodoType[]>([]);
  const [todoForm, setTodoForm] = useState<TodoForm>({
    title: "",
    content: "",
    completedDate: new Date().toLocaleDateString("sv-SE"),
    responsibleUserName: "",
  });

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    const res: TodoType[] = await api.get("/todo_lists").then((r) => r.data);
    setTodoLists(res);
  };

  const postTodo = async () => {
    const params = {
      ...todoForm,
      completedDate: new Date(todoForm.completedDate),
    };
    await api
      .post("/todo", params)
      .then((r) => {
        const todo = r.data;
        setTodoLists((prev) => [...prev, todo]);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTodoForm({
          title: "",
          content: "",
          completedDate: new Date().toLocaleDateString("sv-SE"),
          responsibleUserName: "",
        });
      });
  };

  const updateTodoCompleted = async (id: number, checked: boolean) => {
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

  const deleteTodo = async (id: number) => {
    console.log({ id });
    await api
      .delete(`/todo/${id}`)
      .then(() => setTodoLists((prev) => prev.filter((todo) => todo.id !== id)))
      .catch((r) => console.log(r));
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 m-16">
        {todoLists.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              updateTodoCompleted={updateTodoCompleted}
              deleteTodo={deleteTodo}
            />
          );
        })}
        <div className="mt-4">
          <FormControl className="mt-4">
            <FormLabel>タスク名</FormLabel>
            <Input
              type="text"
              value={todoForm.title}
              onChange={(e) =>
                setTodoForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </FormControl>
          <FormControl className="mt-4">
            <FormLabel>タスク内容</FormLabel>
            <Textarea
              value={todoForm.content}
              onChange={(e) =>
                setTodoForm((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </FormControl>
          <FormControl className="mt-4">
            <FormLabel>期限日</FormLabel>
            <Input
              type="date"
              value={todoForm.completedDate}
              onChange={(e) =>
                setTodoForm((prev) => ({
                  ...prev,
                  completedDate: e.target.value,
                }))
              }
            />
          </FormControl>
          {/* いずれユーザー登録機能を作り、ユーザーをプルダウンで表示させたい */}
          <FormControl className="mt-4">
            <FormLabel>担当者</FormLabel>
            <Input
              type="text"
              value={todoForm.responsibleUserName}
              onChange={(e) =>
                setTodoForm((prev) => ({
                  ...prev,
                  responsibleUserName: e.target.value,
                }))
              }
            />
          </FormControl>
          <Button className="mt-4" onClick={postTodo}>
            タスク追加
          </Button>
        </div>
      </div>
    </div>
  );
};
