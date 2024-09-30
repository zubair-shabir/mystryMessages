import mongoose from "mongoose";

type COnnectiontionObject = {
  isConnected?: number;
};

const connection: COnnectiontionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed", error);

    process.exit(1);
  }
}

export default dbConnect;
