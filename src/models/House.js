import { Schema } from "mongoose";

export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, max: 30, required: true },
    bathrooms: { type: Number, max: 25, required: true },
    levels: { type: Number, max: 4, required: true },
    price: { type: Number, max: 10000000, required: true },
    imgUrl: { type: String, max: 500, required: true },
    description: { type: String, max: 500 },
    year: { type: Number, min: 1000, max: 2025, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

HouseSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})