import { Button } from "@chakra-ui/react";
import api from "../services/api";

export const TodoListPage = () => {
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
      <Button onClick={postTodo}>テスト</Button>
    </div>
  );
};
