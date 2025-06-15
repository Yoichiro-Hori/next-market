import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { SignJWT } from "jose"

export async function POST(request) {
  const reqBody = await request.json()
  try {
    await connectDB()
    //emailをキーにユーザを取得
    const savedUser = await UserModel.findOne({ email: reqBody.email })

    //ユーザが存在する場合
    if (savedUser) {
      //パスワードが正しい場合
      if (reqBody.password == savedUser.password) {
        //token生成
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const payload = {
          email: reqBody.email,
        }
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(secretKey)

        return NextResponse.json({ message: "login success", token: token })

        //パスワードが間違っている場合
      } else {
        return NextResponse.json({ message: "e-mail or password is incorrect" })
      }

      //ユーザが存在しない場合
    } else {
      return NextResponse.json({ message: "create new account" })
    }
  } catch {
    return NextResponse.json({ message: "login error" })
  }
}
