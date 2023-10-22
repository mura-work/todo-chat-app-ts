import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("カテゴリのインサート");
  await Promise.all(
    [
      { name: "仕事", color: "gray" },
      { name: "学業", color: "red" },
      { name: "家事", color: "orange" },
      { name: "健康", color: "yellow" },
      { name: "趣味", color: "green" },
      { name: "スポーツ", color: "teal" },
      { name: "イベント", color: "blue" },
      { name: "買い物", color: "cyan" },
      { name: "旅行", color: "purple" },
      { name: "社会活動", color: "pink" },
    ].map(async (category) => {
      await prisma.category.create({
        data: {
          name: category.name,
          isValid: true,
          color: category.color,
          todoLists: {
            create: [],
          },
        },
      });
    })
  );

  console.log("todoリストのインサート");
  await Promise.all(
    [...Array(10)].map(async (_, i) => {
      await prisma.todo.create({
        data: {
          title: `サンプル${i + 1}`,
          content: `これはサンプル${i + 1}のタスクです`,
          completedDate: new Date(),
          responsibleUserName: "ユーザー1",
          isDone: i % 2 === 0,
          categories: {
            connect: [{ id: i + 1 }],
            // create: [],
          },
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
