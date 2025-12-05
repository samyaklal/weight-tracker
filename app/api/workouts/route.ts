import { connectDb } from "../db";
import { Workout } from "./db";

export async function GET() {
  await connectDb();
  return Response.json({ workouts: await Workout.find() });
}

export async function POST(request: Request) {
  const body = await request.json();
  await connectDb();
  await Workout.create(body);
  return Response.json({ workouts: await Workout.find() });
}
