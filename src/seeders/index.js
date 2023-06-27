const { PrismaClient } = require('@prisma/client');
const seedDistrict = require('./district');
const seedMod = require('./moderator');
const seedProvince = require('./province');
const seedWard = require('./ward');

const prisma = new PrismaClient()

const deleteData = async () => {
  await prisma.ward.deleteMany({});
  await prisma.district.deleteMany({});
  await prisma.province.deleteMany({});
}

const runSeeder = async () => {
  await deleteData().catch(err => console.log(err));
  await seedMod().catch(err => console.log(err));
  await seedProvince().catch(err => console.log(err))
  await seedDistrict().catch(err => console.log(err));
  await seedWard().catch(err => console.log(err));
  console.log('Seed data successfully.');

};

runSeeder();
