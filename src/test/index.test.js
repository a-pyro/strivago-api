import dotenv from 'dotenv';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import AccomodationModel from '../models/Accomodation.js';

dotenv.config();

const request = supertest(app);

beforeAll((done) => {
  mongoose
    .connect(process.env.MONGO_URL + 'test', {
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

const accomodation = {
  name: 'test',
  description: 'test',
  maxGuests: 10,
  city: 'Munich',
};

describe('Checking api main endpoints', () => {
  it('Should check that the /accomodation endpoint returns the full list of accomodations', async () => {
    const response = await request.get('/accomodation');

    await AccomodationModel.create(accomodation);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it("should check that the /accomodation endpoint return the id of accomodation", async()=>{
    const response = await request.post("/accomodation");
    await AccomodationModel.create(accomodation)

    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
    expect(typeof response.body._id).toBe("string")
  })
  it("should check that the /accomodation/{id} enpoint return the edited accomodation", async()=>{
    const response = await request.put("/accomodation/:id");
    
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toBeDefined() 
  })
  it("should check that the /accomodation/{id} endpoint return the delete accomodation", async()=>{
    const response = await request.delete("/accomodation/:id");

    expect(response.status).toBe(204)

  })
});
