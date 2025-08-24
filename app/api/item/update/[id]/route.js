import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function PUT(request, context) {
  //入力されたアイテムデータを取得
  const reqBody = await request.json()
  try {
    await connectDB()
    //入力されたアイテムデータからidを取得し、DBを検索
    const resolvedParams = await context.params
    const singleItem = await ItemModel.findById(resolvedParams.id)

    //アイテムのメールアドレスとリクエストユーザのメールアドレスが一致するかチェック
    if (singleItem.email === reqBody.email) {
      //一致する場合
      //アイテムを更新
      await ItemModel.updateOne({ _id: resolvedParams.id }, reqBody)
      return NextResponse.json({ message: "Item update success" })
    } else {
      //一致しない場合
      return NextResponse.json({ message: "No permissions to edit" })
    }
  } catch {
    return NextResponse.json({ message: "Item update error" })
  }
}
