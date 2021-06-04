import { Router } from 'express';
import AccomodationModel from '../models/Accomodation.js';
const router = Router();

// will return the list of all available locations where there is an accommodation; i.e. the list of cities, without duplicates
router.get('/', async (req, res, next) => {
  try {
    const cities = await AccomodationModel.find({});
    const uniqueCities = [...new Set(cities.map((c) => c.city))];
    res.status(200).send(uniqueCities);
  } catch (error) {
    next(error);
  }
});

router.get('/:city', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
