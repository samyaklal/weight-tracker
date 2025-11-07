import { connectDb } from "../db";
import { Workout } from "./db";

export async function GET() {
  await connectDb();
  return Response.json({ workouts: await Workout.find() });
}
