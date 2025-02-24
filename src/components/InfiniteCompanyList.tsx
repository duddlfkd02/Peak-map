import { useCallback, useEffect, useRef, useState } from "react";
import { Company } from "../types";
import useCompany from "../hooks/useCompany";
import phone from "../assets/images/phone ico.svg";
import web from "../assets/images/web ico.svg";

interface InfiniteCompanyListProps {
  setSelectedCompany: (company: Company) => void;
}

const InfiniteCompanyList = ({ setSelectedCompany }: InfiniteCompanyListProps) => {
  const { companies } = useCompany();
  const [visibleCompanies, setVisibleCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    const itemsPerPage = 5;
    const nextPage = companies.slice(0, page * itemsPerPage);
    setVisibleCompanies(nextPage);
  }, [companies, page]);

  useEffect(() => {
    loadMore();
  }, [page, loadMore]);

  // 무한 스크롤
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">기업 목록</h2>
      <ul className="space-y-6 overflow-y-auto">
        {visibleCompanies.map((company) => (
          <li
            key={company.id}
            onClick={() => setSelectedCompany(company)}
            className="rounded-md bg-white p-3 shadow-md"
          >
            <h3>
              {company.name} <span className="text-sm text-gray-500">{company.category}</span>
            </h3>
            <p className="mb-2 text-sm">{company.address}</p>

            <div>
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
        ))}
      </ul>

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default InfiniteCompanyList;
