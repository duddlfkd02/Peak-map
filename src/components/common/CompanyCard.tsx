import { Company } from "../../types";
import phone from "../../assets/images/phone ico.svg";
import web from "../../assets/images/web ico.svg";

interface CompanyCardProps {
  company: Company;
  onSelect: (company: Company) => void;
}

const CompanyCard = ({ company, onSelect }: CompanyCardProps) => {
  return (
    <li className="cursor-pointer rounded-md bg-white p-3 shadow-md" onClick={() => onSelect(company)}>
      <h3 className="text-lg font-bold">
        {company.name} <span className="text-sm text-gray-500">{company.category}</span>
      </h3>
      <p className="mb-2 text-sm">{company.address}</p>
      <div className="space-y-2">
        <p className="flex gap-2 text-sm">
          <img src={phone} alt="전화 아이콘" />
          {company.phone}
        </p>
        <p className="flex gap-2 text-sm">
          <img src={web} alt="웹 아이콘" />
          {company.website}
        </p>
      </div>
    </li>
  );
};

export default CompanyCard;
