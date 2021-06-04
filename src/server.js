import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import listEndpoints from 'express-list-endpoints';
import morgan from 'morgan';
import * as OpenApiValidator from 'express-openapi-validator';
import accomodationRoutes from './routes/accomodations.js';
import destinationsRoutes from './routes/destinations.js';
import { errorHandler } from './middlewares/errors/errorHandlers.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
export const app = express();

const { PORT } = process.env;

app.use(cors());

// app.use(
//   OpenApiValidator.default.middleware({
//     apiSpec: join(
//       dirname(fileURLToPath(import.meta.url)),
//       './apiDescription.yaml'
//     ),
//     validateRequests: true, // (default)
//     validateResponses: true, // false by default
//   })
// );

app.use(express.json());

app.use(morgan('dev'));

app.use('/accomodation', accomodationRoutes);

app.use('/destinations', destinationsRoutes);

app.use(errorHandler);

await connectDB();

console.table(listEndpoints(app));

app.listen(PORT, () => {
  console.log('running on port: ', PORT);
});
