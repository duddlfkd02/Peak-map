import { useState } from "react";
import { mockCompanies } from "../mocks/companies";
import { Company } from "../types";

const useCompany = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);

  return { companies, setCompanies };
};

export default useCompany;
