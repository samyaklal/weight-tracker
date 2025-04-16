import { MongoClient } from "mongodb";

export async function getCollection(collection: string) {
  const client = await MongoClient.connect(
    "mongodb+srv://samyak07:NGosusrYBmNPqnKK@cluster0.ps09ugr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  return db.collection(collection);
}
