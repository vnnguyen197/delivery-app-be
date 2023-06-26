const seedDistrict = require('./district');
const seedMod = require('./moderator');
const seedProvince = require('./province');
const seedWard = require('./ward');

const runSeeder = async () => {
  await seedMod().catch(err => console.log(err));
  await seedProvince().catch(err => console.log(err))
  await seedDistrict().catch(err => console.log(err));
  await seedWard().catch(err => console.log(err));
  console.log('Seed data successfully.');

};

runSeeder();
