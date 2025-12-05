import { connectDb } from "../../db";
import { Workout } from "../db";

export async function PATCH(
  request: Request,
  { params: { workoutId } }: { params: { workoutId: string } },
) {
  const body = await request.json();
  await connectDb();
  await Workout.findByIdAndUpdate(workoutId, body);
  return Response.json({ workouts: await Workout.find() });
}

export async function DELETE(
  _request: Request,
  { params: { workoutId } }: { params: { workoutId: string } },
) {
  await connectDb();
  await Workout.findByIdAndDelete(workoutId);
  return Response.json({ workouts: await Workout.find() });
}
