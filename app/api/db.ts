import { connect, Mongoose } from "mongoose";
let connection: Promise<Mongoose> | undefined;

export async function connectDb() {
  if (connection) {
    return connection;
  } else {
    connection = connect(process.env.MONGODB_URI!);
    await connection;
  }
}
