// src/components/Habit/HabitCreationUI_Tailwind.tsx
"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormBlk from "@/components/ui/FormBlk";
import {
  PlusIcon,
  SaveIcon,
  CheckIcon,
  ClockIcon,
} from "@/components/ui/icons";

/* ---------- パレット ---------- */
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
  // モーダルの開閉フラグ
  const [openTypeDlg, setOpenTypeDlg] = useState(false);
  const [openCreateDlg, setOpenCreateDlg] = useState(false);
  const [openColorDlg, setOpenColorDlg] = useState(false);
  const [openTimeDlg, setOpenTimeDlg] = useState(false);

  // 入力データ
  const [habitName, setHabitName] = useState("");
  const [habitQuestion, setHabitQuestion] = useState("");
  const [selectedColor, setSelectedColor] = useState("#BBDEFB");
  const [frequencyType, setFrequencyType] = useState<
    "daily" | "weekly" | "monthly" | "custom"
  >("daily");
  const [customTimes, setCustomTimes] = useState(1);
  const [customDays, setCustomDays] = useState(1);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderHour, setReminderHour] = useState(12);
  const [reminderMinute, setReminderMinute] = useState(0);
  const [reminderPeriod, setReminderPeriod] = useState<"AM" | "PM">("AM");
  const [notes, setNotes] = useState("");

  // helper
  const formatReminderTime = () =>
    `${reminderHour}:${reminderMinute
      .toString()
      .padStart(2, "0")} ${reminderPeriod}`;
  const resetForm = () => {
    setHabitName("");
    setHabitQuestion("");
    setSelectedColor("#BBDEFB");
    setFrequencyType("daily");
    setCustomTimes(1);
    setCustomDays(1);
    setReminderEnabled(false);
    setReminderHour(12);
    setReminderMinute(0);
    setReminderPeriod("AM");
    setNotes("");
  };
  const handleCreate = () => {
    console.log("習慣データ:", {
      habitName,
      habitQuestion,
      selectedColor,
      frequency: {
        type: frequencyType,
        days: frequencyType === "custom" ? customDays : undefined,
        times: frequencyType === "custom" ? customTimes : undefined,
      },
      reminder: reminderEnabled
        ? {
            hour: reminderHour,
            minute: reminderMinute,
            period: reminderPeriod,
            displayTime: formatReminderTime(),
          }
        : null,
      notes,
    });
    setOpenCreateDlg(false);
    resetForm();
  };

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

      {/* ① 習慣タイプ選択モーダル */}
      {openTypeDlg && (
        <Modal onClose={() => setOpenTypeDlg(false)}>
          <div className="w-80 bg-white p-6 rounded-lg">
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
                はい/いいえ
              </button>
              <button className="w-full py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
                計測可能
              </button>
              <button
                className="w-full text-sm text-gray-500 mt-4"
                onClick={() => setOpenTypeDlg(false)}
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
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-3 rounded-t-lg">
              <h3 className="font-bold text-gray-50">習慣を作成</h3>
              <button
                onClick={handleCreate}
                className="flex items-center gap-1 bg-white text-blue-500 px-3 py-1 rounded shadow hover:bg-gray-100"
              >
                <SaveIcon /> 保存
              </button>
            </div>
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
                    <div className="bg-white p-4 rounded-lg w-72">
                      <h4 className="text-center font-bold text-gray-800 mb-3">
                        色を選択
                      </h4>
                      <div className="grid grid-cols-5 gap-2">
                        {colors.map((c, i) => (
                          <button
                            key={i}
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
                <div className="flex flex-wrap gap-4">
                  {(["daily", "weekly", "monthly", "custom"] as const).map(
                    (v) => (
                      <label
                        key={v}
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="accent-blue-600"
                          name="freq"
                          checked={frequencyType === v}
                          onChange={() => setFrequencyType(v)}
                        />
                        {v === "daily"
                          ? "毎日"
                          : v === "weekly"
                          ? "毎週"
                          : v === "monthly"
                          ? "毎月"
                          : "カスタム"}
                      </label>
                    )
                  )}
                </div>
                {frequencyType === "custom" && (
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="number"
                      min={1}
                      className="w-20 border rounded p-1 text-center"
                      value={customTimes}
                      onChange={(e) => setCustomTimes(+e.target.value || 1)}
                    />{" "}
                    回 /
                    <input
                      type="number"
                      min={1}
                      className="w-20 border rounded p-1 text-center"
                      value={customDays}
                      onChange={(e) => setCustomDays(+e.target.value || 1)}
                    />{" "}
                    日間
                  </div>
                )}
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
                        <div className="bg-white p-6 rounded-lg w-72">
                          <h4 className="text-center font-bold text-gray-800 mb-4">
                            時刻を選択
                          </h4>
                          {/* …時計の UI … */}
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
