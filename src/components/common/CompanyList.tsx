import useCompany from "../../hooks/useCompany";
import Pagination from "./Pagination";
import phone from "../../assets/images/phone ico.svg"
import web from "../../assets/images/web ico.svg"
import { useState } from "react";


const CompanyList = () => {
  const { companies } = useCompany();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem  = currentPage * itemsPerPage
  const indexOfFirstItem =  indexOfLastItem - itemsPerPage;

  const currentCompanies = companies.slice(indexOfFirstItem, indexOfLastItem)
  const totalPage = Math.ceil(companies.length / itemsPerPage)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">기업 목록</h2>
      <ul className="space-y-6 overflow-y-auto">
        {currentCompanies.map((company) => {
          return (
            <li key={company.id}  className="p-3 bg-white shadow-md rounded-md">
              <h3 className="text-lg font-bold">
                {company.name}
                {" "}<span className="text-sm text-gray-500">{company.category}</span>
              </h3>
              <p className="text-sm mb-2">{company.address}</p>
              <div className="space-y-2">
                <p className="flex gap-2 text-sm"><img src={phone} alt="전화 아이콘" />{company.phone}</p>
                <p className="flex gap-2 text-sm"><img src={web} alt="웹 아이콘" />{company.website}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChage={setCurrentPage}/>
    </div>
  );
};

export default CompanyList;
