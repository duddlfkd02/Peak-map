import Button from "../common/Button";
import { useCompanyStore } from "../../stores/useCompanyStore";
import { useEffect, useState } from "react";
import phone from "../../assets/images/phone ico.svg";
import web from "../../assets/images/web ico.svg";

const InfiniteCompanyList = () => {
  const { companies, setSelectedCompany, page, setPage } = useCompanyStore();
  const itemsPerPage = 10;

  const [visibleCompanies, setVisibleCompanies] = useState(companies.slice(0, itemsPerPage));

  useEffect(() => {
    setVisibleCompanies(companies.slice(0, page * itemsPerPage));
  }, [page, companies]);

  const loadMore = () => {
    if (visibleCompanies.length < companies.length) {
      setPage(page + 1);
    }
  };

  return (
    <div className="max-h-[65vh] overflow-y-auto pb-16">
      <ul className="space-y-4"> 
        {visibleCompanies.map((company) => (
          <li
            key={company.id}
            className="interactive-element rounded-md bg-lightGray p-4  dark:bg-primary dark:text-lightGray dark:shadow-lg transition hover:bg-opacity-80"
            onClick={() => {
              setSelectedCompany(company);
            }}
          >
            <h3 className="text-lg font-bold text-black dark:text-lightGray">{company.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{company.address}</p>
            
            <div className="space-y-2 mt-3">
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
        ))}
      </ul>
  
      {visibleCompanies.length < companies.length && (
      <Button
        label="더보기"
        onClick={loadMore}
        className="mt-6 w-full rounded-lg bg-primary text-white shadow-md transition-all hover:bg-opacity-90 dark:bg-lightGray dark:text-primary dark:hover:bg-opacity-80"
      />
    )}
    </div>
  );
  
};

export default InfiniteCompanyList;
