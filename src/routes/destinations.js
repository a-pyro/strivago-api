import { Router } from 'express';
import AccomodationModel from '../models/Accomodation.js';
const router = Router();

// will return the list of all available locations where there is an accommodation; i.e. the list of cities, without duplicates
router.get('/', async (req, res, next) => {
  try {
    // const accomodations = await AccomodationModel.find({});
    // const uniqueCities = [...new Set(accomodations.map((a) => a.city))];
    const uniqueCities = await AccomodationModel.find({}).distinct('city');
    res.status(200).send(uniqueCities);
  } catch (error) {
    next(error);
  }
});

router.get('/:city', async (req, res, next) => {
  try {
    const { city } = req.params;
    const accomodations = await AccomodationModel.find({
      city: {
        $regex: new RegExp(city, 'i'),
      },
    });
    res.status(200).send(accomodations);
  } catch (error) {
    next(error);
  }
});

export default router;
