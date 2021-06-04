import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const AccomodationMondel = new Schema(
  {
    name: String,
    description: String,
    maxGuests: Number,
    city: String,
  },
  {
    timestamps: true,
  }
);

export default model('Accomodation', AccomodationMondel);
