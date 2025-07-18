const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "ayman@gmail.com",
      hashedPassword: "hashedpassword123",
      posts: {
        create: [
          {
            title: "First Post",
            slug: "first-post",
            content: "This is the content of the first post.",
          },
        ],
      },
    },
  });

  console.log("✅ Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
