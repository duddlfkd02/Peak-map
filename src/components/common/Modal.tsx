import React, { useEffect } from "react";
import { Company } from "../../types";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  modalPosition: { top: number; left: number };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, company, modalPosition }) => {
  // ESC 키 입력 시 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen || !company) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose} //배경 클릭 시 모달 닫기
    >
      <div
        className="pointer-events-auto absolute w-64 rounded-lg bg-white p-3 shadow-lg"
        style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">{company.name}</h2>
        <p className="text-gray-700">{company.address}</p>

        <div className="mt-4 flex space-x-4">
          {company.phone && <Button label="전화하기" onClick={() => (window.location.href = `tel:${company.phone}`)} />}
          {company.website && (
            <Button label="홈페이지" variant="secondary" onClick={() => window.open(company.website, "_blank")} />
          )}
        </div>

        <Button label="닫기" variant="outline" onClick={onClose} className="mt-4 w-full" />
      </div>
    </div>
  );
};

export default Modal;
