import { Company } from "../../types";
import Button from "./Button";
import phone from "../../assets/images/phone ico.svg";
import web from "../../assets/images/web ico.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  modalPosition: { top: number; left: number };

  onSelectWaypoint: (company: Company) => void;
  onSelectDestination: (company: Company) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  company,
  modalPosition,
  onSelectWaypoint,
  onSelectDestination
}) => {
  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="pointer-events-auto absolute w-48 rounded-lg bg-white p-3 shadow-lg dark:bg-darkGray md:w-64"
        style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold md:text-xl">{company.name}</h2>
        <p className="text-sm text-gray-700 dark:text-lightGray">{company.address}</p>

        {/* phone, web button */}
        <div className="my-4 flex items-center space-x-3">
          {company.phone && (
            <button onClick={() => (window.location.href = `tel:${company.phone}`)}>
              <img src={phone} alt="전화" className="w-6" />
            </button>
          )}
          {company.website && (
            <button onClick={() => company.website && window.open(company.website, "_blank")}>
              <img src={web} alt="홈페이지" className="w-6" />
            </button>
          )}
        </div>

        {/* 경유지, 목적지 */}
        <div className="mt-4 flex space-x-4">
          <Button label="경유지" variant="primary" onClick={() => onSelectWaypoint(company)} />
          <Button label="목적지" variant="secondary" onClick={() => onSelectDestination(company)} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
