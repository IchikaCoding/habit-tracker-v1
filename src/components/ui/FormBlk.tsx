// src/components/ui/FormBlk.tsx
import React from "react";

export type FormBlkProps = {
  label: string;
  children: React.ReactNode;
};

export default function FormBlk({ label, children }: FormBlkProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-800">{label}</label>
      {children}
    </div>
  );
}
