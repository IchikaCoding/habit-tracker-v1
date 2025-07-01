// src/components/ui/Modal.tsx
import React from "react";

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  scroll?: boolean;
};

export default function Modal({ children, onClose, scroll }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${
        scroll ? "overflow-y-auto" : ""
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative">{children}</div>
    </div>
  );
}
