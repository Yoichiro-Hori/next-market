import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";
import { useEffect, useState } from "react";

const useAuth = () => {
  //useStateの設定
  const [loginUserEmail, setLoginUserEmail] = useState("");

  //routerの設定
  const router = useRouter();

  //useEffect処理
  useEffect(() => {
    const checkToken = async () => {
      //ローカルストレージからtokenを取得
      const token = localStorage.getItem("token");
      //token有無チェック（tokenがあれば、ログインしている）
      if (!token) {
        //tokenがない場合
        router.push("/user/login");
      }
      try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch {
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]);
  return loginUserEmail;
};

export default useAuth;
