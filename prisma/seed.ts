import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("todoリストのインサート");
  await prisma.todo.create({
    data: {
      title: "サンプル1",
      content: "これはサンプルのタスクです",
      completed_date: new Date(),
      responsible_username: "ユーザー1",
    },
  });
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
