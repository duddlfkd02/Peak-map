import { Company } from "../../types";
import phone from "../../assets/images/phone ico.svg";
import web from "../../assets/images/web ico.svg";

interface CompanyCardProps {
  company: Company;
  onSelect: (company: Company) => void;
}

const CompanyCard = ({ company, onSelect }: CompanyCardProps) => {
  return (
    <li
      className="flex min-h-[140px] cursor-pointer flex-col justify-between rounded-md border border-transparent bg-lightGray p-4 transition hover:border-gray-300 hover:bg-gray-200 dark:bg-primary dark:hover:border-transparent dark:hover:bg-primary/80"
      onClick={() => onSelect(company)}
    >
      <div>
        <h3 className="text-md font-bold text-black dark:text-white">
          {company.name} <span className="text-sm text-gray-500 dark:text-lightGray">{company.department}</span>
        </h3>
        <p className="mb-2 line-clamp-1 text-xs text-darkGray dark:text-lightGray">{company.address}</p>
      </div>
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-sm text-darkGray dark:text-lightGray">
          <img src={phone} alt="전화 아이콘" />
          {company.phone || <span className="text-gray-400">전화번호 없음</span>}
        </p>
        <p className="flex items-center gap-2 text-sm text-darkGray dark:text-lightGray">
          <img src={web} alt="웹 아이콘" />
          <span className="line-clamp-1 flex-1 overflow-hidden text-ellipsis break-all">
            {company.website || <span className="text-gray-400">웹사이트 없음</span>}
          </span>
        </p>
      </div>
    </li>
  );
};

export default CompanyCard;
