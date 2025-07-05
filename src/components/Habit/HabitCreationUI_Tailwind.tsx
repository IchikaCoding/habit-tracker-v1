"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormBlk from "@/components/ui/FormBlk";
import FrequencyField, { FrequencyValue } from "@/components/ui/FrequencyField";
import {
  PlusIcon,
  SaveIcon,
  CheckIcon,
  ClockIcon,
} from "@/components/ui/icons";
import { db, auth } from "@/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/* ---------- カラーパレット ---------- */
const colors = [
  "#FFCDD2",
  "#F8BBD0",
  "#E1BEE7",
  "#D1C4E9",
  "#C5CAE9",
  "#BBDEFB",
  "#B3E5FC",
  "#B2EBF2",
  "#B2DFDB",
  "#C8E6C9",
  "#DCEDC8",
  "#F0F4C3",
  "#FFF9C4",
  "#FFECB3",
  "#FFE0B2",
  "#FFCCBC",
  "#D7CCC8",
  "#F5F5F5",
  "#CFD8DC",
  "#B0BEC5",
];

export default function HabitCreationUI() {
  /* ---------- モーダル開閉 ---------- */
  const [openTypeDlg, setOpenTypeDlg] = useState(false);
  const [openCreateDlg, setOpenCreateDlg] = useState(false);
  const [openColorDlg, setOpenColorDlg] = useState(false);
  const [openTimeDlg, setOpenTimeDlg] = useState(false);

  /* ---------- 入力値 ---------- */
  const [habitName, setHabitName] = useState("");
  const [habitQuestion, setHabitQuestion] = useState("");
  const [selectedColor, setSelectedColor] = useState("#BBDEFB");
  const [freq, setFreq] = useState<FrequencyValue>({ type: "everyDay" });
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderHour, setReminderHour] = useState(12);
  const [reminderMinute, setReminderMinute] = useState(0);
  const [reminderPeriod, setReminderPeriod] = useState<"AM" | "PM">("AM");
  const [notes, setNotes] = useState("");

  const formatReminderTime = () =>
    `${reminderHour}:${reminderMinute
      .toString()
      .padStart(2, "0")} ${reminderPeriod}`;

  const resetForm = () => {
    setHabitName("");
    setHabitQuestion("");
    setSelectedColor("#BBDEFB");
    setFreq({ type: "everyDay" });
    setReminderEnabled(false);
    setReminderHour(12);
    setReminderMinute(0);
    setReminderPeriod("AM");
    setNotes("");
  };

  const handleCreate = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("ログインしていません");
      return;
    }

    try {
      await addDoc(collection(db, "habits"), {
        uid: user.uid,
        habitName,
        habitQuestion,
        selectedColor,
        frequency: freq,
        reminder: reminderEnabled
          ? {
              hour: reminderHour,
              minute: reminderMinute,
              period: reminderPeriod,
            }
          : null,
        notes,
        createdAt: Timestamp.now(),
      });

      console.log("Firestore に習慣を追加しました！");
      setOpenCreateDlg(false);
      resetForm();
    } catch (error) {
      console.error("Firestore への保存に失敗しました", error);
    }
  };

  /* ---------- 画面 ---------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <h2 className="text-lg font-bold text-gray-800">習慣</h2>
        <button
          onClick={() => setOpenTypeDlg(true)}
          className="p-2 text-blue-600 rounded-full hover:bg-blue-100"
        >
          <PlusIcon />
        </button>
      </header>

      {/* ① タイプ選択モーダル */}
      {openTypeDlg && (
        <Modal onClose={() => setOpenTypeDlg(false)}>
          <div className="bg-white w-[50vw] max-w-xl p-6 rounded-lg">
            <h3 className="text-center font-bold text-lg text-gray-800 mb-4">
              習慣のタイプを選択
            </h3>
            <div className="space-y-3">
              <button
                className="w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                onClick={() => {
                  setOpenCreateDlg(true);
                  setOpenTypeDlg(false);
                }}
              >
                はい / いいえ
              </button>
              <button className="w-full py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
                計測可能
              </button>
              <button
                onClick={() => setOpenTypeDlg(false)}
                className="w-full text-sm text-gray-500 mt-4"
              >
                キャンセル
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ② 習慣作成モーダル */}
      {openCreateDlg && (
        <Modal scroll onClose={() => setOpenCreateDlg(false)}>
          <div className="bg-white w-[50vw] max-w-2xl rounded-lg shadow-lg">
            {/* モーダルヘッダー */}
            <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-3 rounded-t-lg">
              <h3 className="font-bold">習慣を作成</h3>
              <button
                onClick={handleCreate}
                className="flex items-center gap-1 bg-white text-blue-500 px-3 py-1 rounded shadow hover:bg-gray-100"
              >
                <SaveIcon /> 保存
              </button>
            </div>

            {/* フォーム本体 */}
            <div className="p-6 space-y-6">
              {/* 名前 */}
              <FormBlk label="名前">
                <input
                  className="w-full border rounded p-2"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="例: エクササイズ"
                />
              </FormBlk>

              {/* 色 */}
              <FormBlk label="色">
                <button
                  onClick={() => setOpenColorDlg(true)}
                  style={{ backgroundColor: selectedColor }}
                  className="w-12 h-12 rounded-full border-2"
                />
                {openColorDlg && (
                  <Modal onClose={() => setOpenColorDlg(false)}>
                    <div className="bg-white w-96 p-4 rounded-lg">
                      <h4 className="text-center font-bold text-gray-800 mb-3">
                        色を選択
                      </h4>
                      <div className="grid grid-cols-5 gap-2">
                        {colors.map((c) => (
                          <button
                            key={c}
                            style={{ backgroundColor: c }}
                            className="w-9 h-9 rounded-full flex items-center justify-center border"
                            onClick={() => {
                              setSelectedColor(c);
                              setOpenColorDlg(false);
                            }}
                          >
                            {selectedColor === c && <CheckIcon />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Modal>
                )}
              </FormBlk>

              {/* 質問 */}
              <FormBlk label="質問">
                <input
                  className="w-full border rounded p-2"
                  value={habitQuestion}
                  onChange={(e) => setHabitQuestion(e.target.value)}
                  placeholder="例: 今日エクササイズをしましたか？"
                />
              </FormBlk>

              {/* 頻度 */}
              <div className="p-4 border rounded-lg">
                <p className="font-bold mb-3 text-gray-800">頻度</p>
                <FrequencyField value={freq} onChange={setFreq} />
              </div>

              {/* リマインダー */}
              <div className="p-4 border rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-blue-600 w-5 h-5"
                    checked={reminderEnabled}
                    onChange={(e) => setReminderEnabled(e.target.checked)}
                  />
                  <span className="font-bold">リマインダー</span>
                </label>

                {reminderEnabled && (
                  <>
                    <button
                      onClick={() => setOpenTimeDlg(true)}
                      className="mt-3 flex items-center gap-1 px-3 py-1 border text-blue-600 rounded hover:bg-blue-50"
                    >
                      <ClockIcon /> {formatReminderTime()}
                    </button>

                    {openTimeDlg && (
                      <Modal onClose={() => setOpenTimeDlg(false)}>
                        <div className="bg-white w-96 p-6 rounded-lg">
                          <h4 className="text-center font-bold mb-4">
                            時刻を選択
                          </h4>
                          <div className="flex justify-center gap-3 mb-6">
                            <select
                              className="border rounded p-1"
                              value={reminderHour}
                              onChange={(e) => setReminderHour(+e.target.value)}
                            >
                              {[...Array(12)].map((_, i) => (
                                <option key={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                            <select
                              className="border rounded p-1"
                              value={reminderMinute}
                              onChange={(e) =>
                                setReminderMinute(+e.target.value)
                              }
                            >
                              {[
                                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
                              ].map((m) => (
                                <option key={m} value={m}>
                                  {m.toString().padStart(2, "0")}
                                </option>
                              ))}
                            </select>
                            <select
                              className="border rounded p-1"
                              value={reminderPeriod}
                              onChange={(e) =>
                                setReminderPeriod(e.target.value as "AM" | "PM")
                              }
                            >
                              <option>AM</option>
                              <option>PM</option>
                            </select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setReminderHour(12);
                                setReminderMinute(0);
                                setReminderPeriod("AM");
                              }}
                              className="text-gray-500 hover:text-gray-800"
                            >
                              クリア
                            </button>
                            <button
                              onClick={() => setOpenTimeDlg(false)}
                              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              完了
                            </button>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </>
                )}
              </div>

              {/* メモ */}
              <FormBlk label="メモ">
                <textarea
                  rows={4}
                  className="w-full border rounded p-2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </FormBlk>

              {/* キャンセル */}
              <div className="text-right">
                <button
                  onClick={() => setOpenCreateDlg(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
