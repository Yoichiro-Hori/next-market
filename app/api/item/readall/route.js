import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function GET() {
  try {
    await connectDB()
    //全てのアイテムデータを取得
    const allItems = await ItemModel.find()
    return NextResponse.json({
      message: "Item readall success",
      allItems: allItems,
    })
  } catch {
    return NextResponse.json({ message: "Item readall error" })
  }
}
//リクエストのたびにデータ取得を行う
export const revalidate = 0
