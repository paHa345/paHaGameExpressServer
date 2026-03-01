import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(
    `mongodb+srv://Vercel-Admin-${process.env.MONGODB_USERNAME}-VercelDB:${process.env.MONGODB_PASSWORD}@paha345-verceldb.z4hjuwq.mongodb.net/paHaGameDB?retryWrites=true&w=majority`,
  );
};
