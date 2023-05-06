const seedMod = require('./moderator');

const runSeeder = async () => {
  await seedMod().catch(err => console.log(err));
};

runSeeder();
