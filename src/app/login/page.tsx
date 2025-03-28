// pages.tsx

"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.error("ログイン失敗", error);
    }
  };

  return (
    <div className="min-h-screen flex item-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Googleでログイン
      </button>
    </div>
  );
}
