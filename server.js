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
  const allLists = await prisma.todo.findMany({
    include: {
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const categories = await prisma.category.findMany({});
  const categoryList = await Promise.all(
    categories.map(async (c) => {
      const list = await prisma.todo.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          categories: { some: { name: c.name } },
        },
        include: {
          categories: true,
        },
      });
      return [c.slug, list];
    })
  );
  const response = {
    all: allLists,
    ...Object.fromEntries(categoryList),
  };
  res.json(response);
});

app.post("/todo", async (req, res) => {
  const { title, content, completedDate, responsibleUserName, categoryIds } =
    req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      content,
      completedDate,
      responsibleUserName,
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
    include: {
      categories: true,
    },
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

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(todo);
});

app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany({});
  res.json(categories.filter((c) => c.isValid));
});
