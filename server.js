const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.listen(3002, () =>
  console.log("REST API server ready at: http://localhost:3002")
);

app.get('/todo_lists', async (req, res) => {
  const lists = await prisma.todo.findMany();
  res.json(lists);
});