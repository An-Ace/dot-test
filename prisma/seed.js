// User Seeder for prisma

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');


async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@demo.com',
      name: 'Test User',
      accounts: {
        create: {
          provider: "CREDENTIALS",
          password: bcryptjs.hashSync('password'),
          refreshToken: crypto.randomUUID()
        },
      }
    },
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });