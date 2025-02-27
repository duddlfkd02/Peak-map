import { useCallback, useEffect, useMemo, useState } from "react";
import { useCompanyStore } from "../../stores/useCompanyStore";
import Pagination from "../common/Pagination";
import { mockCompanies } from "../../mocks/companies";
import { Company } from "../../types";
import CompanyCard from "./CompanyCard";
import logowhite from "../../assets/images/logowhite.svg";
import logoblack from "../../assets/images/logoblack.svg";

const ITEMS_PER_PAGE = 5;

const CompanyList = () => {
  const { companies, setSelectedCompany, setCompanies } = useCompanyStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCompanies(mockCompanies);
  }, [setCompanies]);

  const currentCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return companies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [companies, currentPage]);

  const totalPage = Math.ceil(companies.length / ITEMS_PER_PAGE);

  const handleSelectCompany = useCallback(
    (company: Company) => {
      setSelectedCompany(company);
    },
    [setSelectedCompany]
  );

  return (
    <div className="dark:bg-darkGray rounded-lg bg-white p-4">
      <h2 className="mb-3">
        <img src={logoblack} alt="peak 로고" className="block w-24 dark:hidden" />
        <img src={logowhite} alt="peak 로고" className="hidden w-24 dark:block" />
      </h2>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4">
          {currentCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} onSelect={handleSelectCompany} />
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-center border-t pt-4 dark:border-gray-700">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChage={setCurrentPage} />
      </div>
    </div>
  );
};

export default CompanyList;
