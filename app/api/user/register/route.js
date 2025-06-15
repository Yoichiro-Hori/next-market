import connectDB from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { NextResponse } from "next/server"

export async function POST(request) {
  //入力されたユーザのデータを取得
  const reqBody = await request.json()
  try {
    await connectDB()
    //ユーザを登録
    await UserModel.create(reqBody)
    return NextResponse.json({ message: "user registration success" })
  } catch {
    return NextResponse.json({ message: "user registration error" })
  }
}
