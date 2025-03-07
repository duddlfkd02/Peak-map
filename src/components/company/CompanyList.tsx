import { useCallback, useEffect, useMemo, useState } from "react";
import { useCompanyStore } from "../../stores/useCompanyStore";
import Pagination from "../common/Pagination";
import { mockCompanies } from "../../mocks/companies_mock";
import { Company } from "../../types";
import CompanyCard from "./CompanyCard";

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
    <div className="flex min-h-[600px] flex-col justify-between dark:bg-darkGray">
      <div className="flex-1">
        <ul className="space-y-4">
          {currentCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} onSelect={handleSelectCompany} />
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-center pt-4 dark:border-gray-700">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChage={setCurrentPage} />
      </div>
    </div>
  );
};

export default CompanyList;
