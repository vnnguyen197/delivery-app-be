const { PrismaClient } = require('@prisma/client');
const { hash, genSalt } = require('bcrypt');

const prisma = new PrismaClient();

const moderators = [
  {
    fullName: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: "password123",
  },
];

const seedMod = async () => {
  await prisma.moderator.deleteMany({});

  for (const mod of moderators) {
    await prisma.moderator.create({ data: mod });
  }

  console.log('Seed data successfully.');
  await prisma.$disconnect();
};

module.exports = seedMod;
