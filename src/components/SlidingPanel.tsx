import React, { useEffect } from "react";
import { Company } from "../types";
import Button from "./common/Button";

interface SlidingPanelProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ company, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg transition-transform ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {company ? (
        <>
          <h2 className="text-xl font-bold">{company.name}</h2>
          <p className="text-sm">{company.address}</p>

          <div className="mt-4 flex gap-2">
            {company.phone && (
              <Button label="전화하기" onClick={() => (window.location.href = `tel:${company.phone}`)} />
            )}
            {company.website && (
              <Button label="홈페이지" variant="secondary" onClick={() => window.open(company.website, "_blank")} />
            )}
          </div>

          <Button label="닫기" variant="outline" onClick={onClose} className="mt-4 w-full" />
        </>
      ) : (
        <p>기업 정보를 불러오는 중 입니다.</p>
      )}
    </div>
  );
};

export default SlidingPanel;
