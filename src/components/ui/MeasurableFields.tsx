// 💡 命名した型名を使う（例: MeasurableFieldsProps）

import FormBlk from "./FormBlk";

type MeasurableFieldsProps = {
  unit: string;
  setUnit: (val: string) => void;
  minTarget: number | "";
  setMinTarget: (val: number | "") => void;
  maxTarget: number | "";
  setMaxTarget: (val: number | "") => void;
};

export default function MeasurableFields({
  unit,
  setUnit,
  minTarget,
  setMinTarget,
  maxTarget,
  setMaxTarget,
}: MeasurableFieldsProps) {
  return (
    <>
      <FormBlk label="単位">
        <input
          className="w-full border rounded p-2"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="例: 分、回、ml"
        />
      </FormBlk>

      <FormBlk label="目標（最低限）">
        <input
          type="number"
          className="w-full border rounded p-2"
          value={minTarget}
          onChange={(e) =>
            setMinTarget(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="例: 10"
        />
      </FormBlk>

      <FormBlk label="目標（最大限・任意）">
        <input
          type="number"
          className="w-full border rounded p-2"
          value={maxTarget}
          onChange={(e) =>
            setMaxTarget(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="例: 30"
        />
      </FormBlk>
    </>
  );
}
