import { useState, useEffect } from "react";
// import useCompany from "../hooks/useCompany";
import { Company } from "../types";
import Button from "./common/Button";
import { useCompanyStore } from "../stores/useCompanyStore";

const InfiniteCompanyList = () => {
  const { companies, setSelectedCompany } = useCompanyStore();
  const [visibleCompanies, setVisibleCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

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
      {visibleCompanies.map((company) => (
        <div
          key={company.id}
          className="mb-2 rounded-md bg-white p-3 shadow-md"
          onClick={() => setSelectedCompany(company)}
        >
          <h3 className="text-lg font-bold">{company.name}</h3>
          <p className="text-sm text-gray-600">{company.address}</p>
        </div>
      ))}
      {visibleCompanies.length < companies.length && (
        <Button label="더보기" onClick={loadMore} className="mt-2 w-full" />
      )}
    </div>
  );
};

export default InfiniteCompanyList;
