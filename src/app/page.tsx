// src/page.tsx

"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddHabit = async () => {
    if (!title.trim() || !userId) return;
    try {
      await addDoc(collection(db, "habits"), {
        userId,
        title,
        question,
        frequency: "daily",
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setQuestion("");
      alert("習慣を登録しました！");
    } catch (error) {
      console.error("習慣の追加に失敗しました", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">習慣を追加</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="習慣のタイトル（例：ストレッチ）"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          placeholder="習慣の質問（例：今日はストレッチをしましたか？）"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleAddHabit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          習慣を登録
        </button>
      </div>
    </div>
  );
}
