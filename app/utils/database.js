import mongoose from "mongoose"
//DB接続処理
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yhori:pdnm4ev7@cluster0.wmdadm7.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0"
    )
    console.log("[DB connect]: success")
  } catch {
    console.log("[DB connect]: error")
    throw new Error()
  }
}
export default connectDB
