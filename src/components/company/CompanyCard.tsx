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
      className="bg-lightGray dark:bg-primary dark:hover:bg-primary/80 cursor-pointer rounded-md border border-transparent p-4 transition hover:border-gray-300 hover:bg-gray-200 dark:hover:border-transparent"
      onClick={() => onSelect(company)}
    >
      <h3 className="text-md font-bold text-black dark:text-white">
        {company.name} <span className="dark:text-lightGray text-sm text-gray-500">{company.category}</span>
      </h3>
      <p className="text-darkGray dark:text-lightGray mb-2 text-xs">{company.address}</p>
      <div className="space-y-2">
        <p className="text-darkGray dark:text-lightGray flex gap-2 text-sm">
          <img src={phone} alt="전화 아이콘" />
          {company.phone}
        </p>
        <p className="text-darkGray dark:text-lightGray flex gap-2 text-sm">
          <img src={web} alt="웹 아이콘" />
          {company.website}
        </p>
      </div>
    </li>
  );
};

export default CompanyCard;
