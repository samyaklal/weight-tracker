import {
  Schema,
  model,
  InferSchemaType,
  HydratedDocumentFromSchema,
  models,
} from "mongoose";

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
});

export type WorkoutType = InferSchemaType<typeof workoutSchema>;
export type WorkoutSchema = HydratedDocumentFromSchema<typeof workoutSchema>;
export const Workout = models.Workout || model("Workout", workoutSchema);
