import React, { useEffect } from "react";
import { Company } from "../../types";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, company }) => {

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
      className="fixed inset-0  z-50" 
      onClick={onClose} //배경 클릭 시 모달 닫기
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 pointer-events-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">{company.name}</h2>
        <p className="text-gray-700">{company.address}</p>

        <div className="flex  mt-4 space-x-4">
        {company.phone && (
            <Button label="전화하기" onClick={() => window.location.href = `tel:${company.phone}`} />
          )}
          {company.website && (
            <Button
              label="홈페이지"
              variant="secondary"
              onClick={() => window.open(company.website, "_blank")}
            />
          )}
        </div>

        <Button label="닫기" variant="outline" onClick={onClose} className="mt-4 w-full" />
      </div>
      </div>
  
  );
};

export default Modal;
