import { create } from "zustand";
import { Company } from "../types";
import { devtools } from "zustand/middleware";

interface CompanyState {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  setCompanies: (companies: Company[]) => void;
}

export const useCompanyStore = create<CompanyState>()(
  devtools(
    (set) => ({
      companies: [],
      selectedCompany: null,
      setSelectedCompany: (company) => set({ selectedCompany: company }),
      setCompanies: (companies) => set({ companies })
    }),
    { name: "CompanyStore" }
  )
);
