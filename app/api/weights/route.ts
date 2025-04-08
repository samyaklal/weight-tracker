import { MongoClient, type Db } from "mongodb";

const weights = [{ workoutName: "Lat Pulldown", weight: 30 }];

export async function GET() {
  const client = await MongoClient.connect(
    "mongodb+srv://samyak07:NGosusrYBmNPqnKK@cluster0.ps09ugr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  db.collection('weights')
  return Response.json({ weights });
}
