import dotenv from 'dotenv';
import supertest from 'supertest';
import { app } from '../server.js';
dotenv.config();

const request = supertest(app);

beforeAll((done) => {
  console.log(process.env.MONGO_URL);
  mongoose
    .connect(process.env.ATLAS_URL + 'test', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to Atlas in test.');
      done();
    });
});

afterAll((done) => {
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
