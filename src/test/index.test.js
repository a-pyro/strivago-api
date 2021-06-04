import dotenv from 'dotenv';
import supertest from 'supertest';
import { app } from '../server.js';
dotenv.config();

const request = supertest(app);
