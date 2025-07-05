"use client";
import { useState, useRef } from "react";
import Modal from "@/components/ui/Modal";

/* ---------- 型 ---------- */
export type FrequencyType =
  | "everyDay"
  | "everyXDays"
  | "timesPerWeek"
  | "timesPerMonth"
  | "timesInDays";

export interface FrequencyValue {
  type: FrequencyType;
  x?: number; // 回数 or 日数
  y?: number; // times-in-days の日数
}

/* ---------- メイン ---------- */
export default function FrequencyField({
  value,
  onChange,
}: {
  value: FrequencyValue;
  onChange: (v: FrequencyValue) => void;
}) {
  const [open, setOpen] = useState(false);

  /* ラベル生成 */
  const summary = () => {
    switch (value.type) {
      case "everyDay":
        return "Every day";
      case "everyXDays":
        return `Every ${value.x ?? "–"} days`;
      case "timesPerWeek":
        return `${value.x ?? "–"} times / week`;
      case "timesPerMonth":
        return `${value.x ?? "–"} times / month`;
      case "timesInDays":
        return `${value.x ?? "–"} times in ${value.y ?? "–"} days`;
      default:
        return "Select frequency";
    }
  };

  return (
    <>
      {/* 表示用ボタン */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full text-left p-3 border rounded-lg bg-white hover:bg-gray-50"
      >
        {summary()}
      </button>

      {/* モーダル本体 */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="bg-white w-[50vw] max-w-xl p-6 rounded-lg space-y-5">
            <h3 className="font-bold text-lg text-center">頻度を選択</h3>

            {/* 1. Every day */}
            <Option
              checked={value.type === "everyDay"}
              onSelect={() => onChange({ type: "everyDay" })}
            >
              Every day
            </Option>

            {/* 2. Every X days */}
            <Option
              checked={value.type === "everyXDays"}
              onSelect={() =>
                onChange({
                  type: "everyXDays",
                  x: value.x ?? 2,
                })
              }
            >
              Every
              <InputNumber
                value={value.type === "everyXDays" ? value.x : undefined}
                onChange={(v) => onChange({ type: "everyXDays", x: v })}
              />
              days
            </Option>

            {/* 3. X times per week */}
            <Option
              checked={value.type === "timesPerWeek"}
              onSelect={() =>
                onChange({
                  type: "timesPerWeek",
                  x: value.x ?? 3,
                })
              }
            >
              <InputNumber
                value={value.type === "timesPerWeek" ? value.x : undefined}
                onChange={(v) => onChange({ type: "timesPerWeek", x: v })}
              />
              times&nbsp;/&nbsp;week
            </Option>

            {/* 4. X times per month */}
            <Option
              checked={value.type === "timesPerMonth"}
              onSelect={() =>
                onChange({
                  type: "timesPerMonth",
                  x: value.x ?? 10,
                })
              }
            >
              <InputNumber
                value={value.type === "timesPerMonth" ? value.x : undefined}
                onChange={(v) => onChange({ type: "timesPerMonth", x: v })}
              />
              times&nbsp;/&nbsp;month
            </Option>

            {/* 5. X times in Y days */}
            <Option
              checked={value.type === "timesInDays"}
              onSelect={() =>
                onChange({
                  type: "timesInDays",
                  x: value.x ?? 5,
                  y: value.y ?? 7,
                })
              }
            >
              <InputNumber
                value={value.type === "timesInDays" ? value.x : undefined}
                onChange={(v) =>
                  onChange({
                    type: "timesInDays",
                    x: v,
                    y: value.y,
                  })
                }
              />
              times&nbsp;in&nbsp;
              <InputNumber
                value={value.type === "timesInDays" ? value.y : undefined}
                onChange={(v) =>
                  onChange({
                    type: "timesInDays",
                    x: value.x,
                    y: v,
                  })
                }
              />
              days
            </Option>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full py-2 mt-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ---------- サブ ---------- */
function Option({
  checked,
  onSelect,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer w-full">
      <input
        type="radio"
        checked={checked}
        onChange={onSelect}
        className="accent-blue-600 shrink-0"
      />
      <div
        className="flex flex-wrap items-center gap-2"
        /* 入力をクリックした時に自動でそのオプションを選択 */
        onClick={onSelect}
      >
        {children}
      </div>
    </label>
  );
}

function InputNumber({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (v: number) => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <input
      ref={ref}
      type="number"
      min={1}
      value={value ?? ""}
      onFocus={() => ref.current?.select()}
      onChange={(e) => onChange(+e.target.value || 1)}
      className="w-16 border rounded p-1 text-center"
    />
  );
}
