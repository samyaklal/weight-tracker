import { MongoClient, type Db } from "mongodb";

let dbConnection: Db;

export const connectDb = (cb: (e?: Error) => unknown) => {
  MongoClient.connect(
    "mongodb+srv://samyak07:NGosusrYBmNPqnKK@cluster0.ps09ugr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((e) => {
      console.error(e);
      return cb(e);
    });
};

export const getDb = () => dbConnection;
