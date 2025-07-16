// src/components/ui/icons.tsx

export const PlusIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    role="img"
    aria-label="追加アイコン"
  >
    <title>追加</title>
    <path
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 5v14m7-7H5"
    />
  </svg>
);

export const SaveIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    role="img"
    aria-label="保存アイコン"
  >
    <title>保存</title>
    <path
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-8 8h2m4-18H7a2 2 0 00-2 2v12a2 2 0 002 2h0a2 2 0 002-2V7h6v5h2V6a2 2 0 00-2-2z"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="white"
    viewBox="0 0 24 24"
    role="img"
    aria-label="チェックアイコン"
  >
    <title>色の選択</title>
    <path
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const ClockIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    role="img"
    aria-label="時計アイコン"
  >
    <title>リマインダーの設定</title>
    <path
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
