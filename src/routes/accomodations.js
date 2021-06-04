import ErrorResponse from '../utils/errorResponse.js';
import AccomodationModel from '../models/Accomodation.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const accomodations = await AccomodationModel.find({});
    res.status(200).send(accomodations);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newAccomodation = await AccomodationModel.create(req.body);
    res.status(201).send(newAccomodation);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {

    const id = req.params.id
    const newAccomodation = await AccomodationModel.findById(id)
    if (newAccomodation){
      res.status(200).send(newAccomodation)
    } else {
      next(new ErrorResponse("ID was not found", 404))
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const newAccomodation = await AccomodationModel.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    })
    if (newAccomodation){
      res.status(200).send(newAccomodation)
    } else {
      next(new ErrorResponse("ID was not found", 404))
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const newAccomodation = await AccomodationModel.findByIdAndDelete(id)
    res.status(204).send()
  } catch (error) {
    next(error);
  }
});

export default router;
