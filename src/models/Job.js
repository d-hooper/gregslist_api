import { Schema } from "mongoose";

export const JobSchema = new Schema(
  {
    company: { type: String, maxLength: 100, required: true },
    jobTitle: { type: String, maxLength: 100, required: true },
    hours: { type: Number, min: 1, maxLength: 168, required: true },
    rate: { type: Number, min: 1, max: 100000000, required: true },
    imgUrl: { type: String, maxLength: 500, required: true },
    description: { type: String, maxLength: 500 }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

JobSchema.virtual('creator', {
  rel: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})