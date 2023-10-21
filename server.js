const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.listen(3002, () =>
  console.log("REST API server ready at: http://localhost:3002")
);

app.get("/todo_lists", async (req, res) => {
  const lists = await prisma.todo.findMany();
  res.json(lists);
});

app.post("/todo_lists", async (req, res) => {
  const { title, content, completed_date, responsible_username } = req.body;
  const todo = await prisma.todo.create({
    data: { title, content, completed_date, responsible_username },
  });
  res.json(todo);
});
