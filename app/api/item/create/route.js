import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function POST(request) {
  //入力されたアイテムデータを取得
  const reqBody = await request.json()
  try {
    await connectDB()
    //アイテムを登録
    await ItemModel.create(reqBody)
    return NextResponse.json({ message: "Item create success" })
  } catch {
    return NextResponse.json({ message: "Item create error" })
  }
}
