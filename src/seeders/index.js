const seedMod = require('./moderator');
const seedProvince = require('./province');

const runSeeder = async () => {
  await seedMod().catch(err => console.log(err));
  await seedProvince().catch(err => console.log(err))
  console.log('Seed data successfully.');

};

runSeeder();
