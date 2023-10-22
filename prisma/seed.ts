import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("todoリストのインサート");
  Promise.all(
    [...Array(10)].map(async (_, i) => {
      await prisma.todo.create({
        data: {
          title: `サンプル${i + 1}`,
          content: `これはサンプル${i + 1}のタスクです`,
          completedDate: new Date(),
          responsibleUserName: "ユーザー1",
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
