import { Schema, model, InferSchemaType } from "mongoose";
const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    weight: Number,
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
export const Workout = model('Workout', workoutSchema);
