const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json()).use(cors());

app.listen(3002, () =>
  console.log("REST API server ready at: http://localhost:3002")
);

app.get("/todo_lists", async (req, res) => {
  const lists = await prisma.todo.findMany({
    include: {
      categories: true,
    },
  });
  res.json(lists);
});

app.post("/todo", async (req, res) => {
  const { title, content, completedDate, responsibleUserName } = req.body;
  const todo = await prisma.todo.create({
    data: { title, content, completedDate, responsibleUserName },
  });
  res.json(todo);
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: {
      isDone: checked,
    },
  });
  res.json(todo);
});
