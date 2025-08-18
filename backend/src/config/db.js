import mongoose from 'mongoose';

export const connectDB = async() => {
  try {
    mongoose.connection.on('connected', ()=> console.log("MediTrack is now connected."))
    await mongoose.connect(process.env.MONGO_URI)
    // console.log("Hoi amaw na connect nang database!");
  } catch (error) {
    console.error("Bombo!! guba imo server: ", error);
    process.exit(1); // Exit the process with failure
  }

}

export default connectDB;