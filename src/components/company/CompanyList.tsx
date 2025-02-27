import { useCallback, useEffect, useMemo, useState } from "react";
import { useCompanyStore } from "../../stores/useCompanyStore";
import Pagination from "../common/Pagination";
import { mockCompanies } from "../../mocks/companies";
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
    <div>
      <h2 className="mb-4 text-xl font-semibold">기업 목록</h2>
      <ul className="space-y-6 overflow-y-auto">
        {currentCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} onSelect={handleSelectCompany} />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChage={setCurrentPage} />
    </div>
  );
};

export default CompanyList;
