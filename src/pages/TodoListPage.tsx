import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  CheckboxGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import api from "../services/api";
import { TodoType, CategoryType } from "../types/index";
import { TodoItem } from "components/TodoItem/TodoItem";
import { SmallAddIcon } from "@chakra-ui/icons";

type TodoForm = {
  title: string;
  content?: string;
  completedDate: string;
  responsibleUserName: string;
  categoryIds: number[];
};

type TodoListType = Record<string, TodoType[]>;

export const TodoListPage = () => {
  const [todoLists, setTodoLists] = useState<TodoListType>({});
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [todoForm, setTodoForm] = useState<TodoForm>({
    title: "",
    content: "",
    completedDate: new Date().toLocaleDateString("sv-SE"),
    responsibleUserName: "",
    categoryIds: [],
  });
  const [todoFormError, setTodoFormError] = useState<{
    [K in keyof TodoForm]: boolean;
  }>({
    title: false,
    content: false,
    completedDate: false,
    responsibleUserName: false,
    categoryIds: false,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    const res: TodoListType = await api.get("/todo_lists").then((r) => r.data);
    setTodoLists(res);
  };

  const fetchCategories = async () => {
    const res: CategoryType[] = await api
      .get("/categories")
      .then((r) => r.data);
    setCategories(res);
  };

  const postTodo = async () => {
    let isValidError = false;
    if (!todoForm.title) {
      setTodoFormError((prev) => ({
        ...prev,
        title: true,
      }));
      isValidError = true;
    }
    if (!todoForm.responsibleUserName) {
      setTodoFormError((prev) => ({
        ...prev,
        responsibleUserName: true,
      }));
      isValidError = true;
    }
    if (isValidError) {
      return;
    }
    const params = {
      ...todoForm,
      completedDate: new Date(todoForm.completedDate),
    };
    await api
      .post("/todo", params)
      .then((r) => {
        const todo = r.data;
        setTodoLists((prev) => {
          todo.categories.forEach((c: CategoryType) => {
            const targetList = prev[c.slug];
            targetList.unshift(todo);
          });
          prev["all"].unshift(todo);
          return prev;
        });
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTodoForm({
          title: "",
          content: "",
          completedDate: new Date().toLocaleDateString("sv-SE"),
          responsibleUserName: "",
          categoryIds: [],
        });
      });
    setIsOpen(false);
  };

  const updateTodoCompleted = async (id: number, checked: boolean) => {
    await api
      .put(`/todo/${id}`, {
        checked,
      })
      .then((r) => {
        setTodoLists((prev) => {
          const newTodoList = Object.entries(prev).map(([key, todoList]) => {
            const newList = todoList.map((todo: TodoType) =>
              todo.id === id ? { ...todo, isDone: r.data.isDone } : todo
            );
            return [key, newList];
          });
          return Object.fromEntries(newTodoList);
        });
      })
      .catch((r) => console.log("失敗", r));
  };

  const deleteTodo = async (id: number) => {
    await api
      .delete(`/todo/${id}`)
      .then(() =>
        setTodoLists((prev) => {
          const newTodoList = Object.entries(prev).map(([key, todoList]) => {
            const newList = todoList.filter((todo: TodoType) => todo.id !== id);
            return [key, newList];
          });
          return Object.fromEntries(newTodoList);
        })
      )
      .catch((r) => console.log(r));
  };

  const updateCategories = (categoryId: number) => {
    if (todoForm.categoryIds.includes(categoryId)) {
      setTodoForm((prev) => ({
        ...prev,
        categoryIds: prev.categoryIds.filter((id: number) => id !== categoryId),
      }));
    } else {
      setTodoForm((prev) => ({
        ...prev,
        categoryIds: [...prev.categoryIds, categoryId],
      }));
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <Tabs variant="enclosed">
        <TabList>
          {[{ slug: "all", name: "ALL" }, ...categories].map((c) => (
            <Tab key={c.slug}>{c.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {[{ slug: "all", name: "ALL" }, ...categories].map((category) => {
            return (
              <TabPanel key={category.slug}>
                {(todoLists[category.slug] ?? []).map((todo: TodoType) => {
                  return (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      updateTodoCompleted={updateTodoCompleted}
                      deleteTodo={deleteTodo}
                    />
                  );
                })}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
      <div className="m-16">
        <Button className="rounded-full" onClick={() => setIsOpen(true)}>
          <SmallAddIcon className="rounded-full" />
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Todo Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl className="mt-4" isInvalid={todoFormError.title}>
                <FormLabel>タスク名</FormLabel>
                <Input
                  type="text"
                  value={todoForm.title}
                  onChange={(e) =>
                    setTodoForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                <FormErrorMessage>
                  タイトルが入力されていません。
                </FormErrorMessage>
              </FormControl>
              <FormControl className="mt-4">
                <FormLabel>タスク内容</FormLabel>
                <Textarea
                  value={todoForm.content}
                  onChange={(e) =>
                    setTodoForm((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl className="mt-4">
                <FormLabel>カテゴリ</FormLabel>
                <CheckboxGroup>
                  {categories.map((category) => {
                    return (
                      <Checkbox
                        key={category.id}
                        isChecked={todoForm.categoryIds.includes(category.id)}
                        className="mr-2 my-2"
                        onChange={() => updateCategories(category.id)}
                      >
                        <Badge
                          key={category.id}
                          className="px-1 mr-1"
                          colorScheme={category.color}
                        >
                          {category.name}
                        </Badge>
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
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
              <FormControl
                className="mt-4"
                isInvalid={todoFormError.responsibleUserName}
              >
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
                <FormErrorMessage>
                  担当者が入力されていません。
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={postTodo}>
                タスク追加
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="ghost">
                キャンセル
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
