// src/page.tsx

"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import HabitCreationUI from "./components/HabitCreationUI";

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

  return <HabitCreationUI />;
}
