import connectDB from "@/app/utils/database"
import { NextResponse } from "next/server"
import { ItemModel } from "@/app/utils/schemaModels"

export async function GET(request, context) {
  try {
    await connectDB()
    //入力されたアイテムデータからidを取得し、DBを検索
    const resolvedParams = await context.params
    const singleItem = await ItemModel.findById(resolvedParams.id)
    return NextResponse.json({
      message: "Item readsingle success",
      singleItem: singleItem,
    })
  } catch {
    return NextResponse.json({ message: "Item readsingle error" })
  }
}
