import ErrorResponse from '../utils/errorResponse.js';
import AccomodationModel from '../models/Accomodation.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    // const accomodations = await AccomodationModel.find({});
    // res.status(200).send(accomodations);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const accomodation = await AccomodationModel.create({
      name: 'test',
      description: 'test',
      maxGuests: 10,
      city: 'rome',
    });
    res.status(201).send(accomodation);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
