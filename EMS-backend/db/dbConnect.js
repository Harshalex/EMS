import mongoose from "mongoose"

function dbConnect() {
  const mongoUri = process.env.MONGODB_URI;
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));

  async function createUser(newUser) {
    const user = new User(newUser);
    const data = await user.save();
    console.log("Data", data);
  }
}

export default dbConnect;

