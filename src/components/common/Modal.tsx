import { Company } from "../../types";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  modalPosition: { top: number; left: number };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, company, modalPosition }) => {
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
        <div className="mt-4 flex space-x-4">
          {company.phone && (
            <Button
              label="전화하기"
              onClick={() => (window.location.href = `tel:${company.phone}`)}
              className="md:text-md px-2 py-1 text-sm md:px-4 md:py-2"
            />
          )}
          {company.website && (
            <Button
              label="홈페이지"
              variant="secondary"
              onClick={() => {
                if (company.website) {
                  window.open(company.website, "_blank");
                }
              }}
              className="md:text-md border-gray-500 px-2 py-2 text-sm text-black hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 md:px-4 md:py-2"
            />
          )}
        </div>

        {/* UI 수정 필요 */}
        {/* <Button label="닫기" variant="outline" onClick={onClose} className="mt-4 w-full border-gray-500 text-black hover:bg-gray-200 dark:border-gray-600 dark:text-lightGray dark:hover:bg-gray-700 md:px-4 md:py-2 px-2  md:text-md text-sm" /> */}
      </div>
    </div>
  );
};

export default Modal;
