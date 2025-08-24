import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  //入力されたアイテムデータを取得
  const reqBody = await request.json();
  try {
    await connectDB();
    //入力されたアイテムデータからidを取得し、DBを検索
    const resolvedParams = await context.params;
    const singleItem = await ItemModel.findById(resolvedParams.id);

    //アイテムのメールアドレスとリクエストユーザのメールアドレスが一致するかチェック
    if (singleItem.email === reqBody.email) {
      //一致する場合
      //アイテムを削除
      await ItemModel.deleteOne({ _id: resolvedParams.id });
      return NextResponse.json({ message: "Item delete success" });
    } else {
      //一致しない場合
      return NextResponse.json({ message: "No permission to delete" });
    }
  } catch {
    return NextResponse.json({ message: "Item delete error" });
  }
}
