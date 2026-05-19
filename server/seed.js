require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Education = require('./models/Education');
const Certification = require('./models/Certification');
const Achievement = require('./models/Achievement');
const seedData = require('./data/seedData');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([
    Project.deleteMany({}),
    Education.deleteMany({}),
    Certification.deleteMany({}),
    Achievement.deleteMany({}),
  ]);

  await Project.insertMany(seedData.projects);
  await Education.insertMany(seedData.education);
  await Certification.insertMany(seedData.certifications);
  await Achievement.insertMany(seedData.achievements);

  console.log('Database seeded with portfolio content');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
