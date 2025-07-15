// src/components/ui/Modal.tsx

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
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
          }
        }}
        role="button"
        tabIndex={0}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
