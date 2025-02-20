import useCompany from "../../hooks/useCompany";

const CompanyList = () => {
  const { companies } = useCompany();

  return (
    <div>
      <h2>기업 목록</h2>
      <ul>
        {companies.map((company) => {
          return (
            <li key={company.id}>
              <h3>
                기업명 : {company.name}
                <span>{company.category}</span>
              </h3>
              <p>{company.address}</p>
              <p>{company.phone}</p>
              <p>{company.website}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CompanyList;
