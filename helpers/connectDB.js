import mongoose, { connections } from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.info("Database Already Connected");
    return;
  }
  mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
    (err) => {
      if (err) console.error(err);
      console.info("Database Connected");
    };
};

export default connectDB;
