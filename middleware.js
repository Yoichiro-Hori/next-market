import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  //tokenの取得
  const token = await request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    //tokenが無効だった場合
    return NextResponse.json({ message: "No token" });
  } else {
    //tokenが有効だった場合
    try {
      const secretKey = new TextEncoder().encode("next-market-app-book");
      const decodedJwt = await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ message: "invalid token. login again" });
    }
  }
}

//middleware適応ファイルの定義
export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
