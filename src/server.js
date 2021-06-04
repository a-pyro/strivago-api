import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import cors from 'cors';
import connectDB from './db/index.js';
import listEndpoints from 'express-list-endpoints';
import morgan from 'morgan';
import accomodationRoutes from './routes/accomodations.js';
import { errorHandler } from './middlewares/errors/errorHandlers.js';

export const app = express();

const { PORT } = process.env;

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: './apiDescription.yaml',
//     validateRequests: true, // (default)
//     validateResponses: true, // false by default
//   })
// );

app.use('/accomodation', accomodationRoutes);

app.use(errorHandler);

await connectDB();

console.table(listEndpoints(app));

app.listen(PORT, () => {
  console.log('running on port: ', PORT);
});
