import { getCollection } from "../db";

export async function GET() {
  const weights = [];
  const collection = await getCollection("weights");
  const cursor = collection.find();

  for await (const weight of cursor) {
    weights.push(weight);
  }
  return Response.json({ weights });
}
