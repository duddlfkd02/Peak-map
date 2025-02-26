import { create } from "zustand";
import { Company } from "../types";
import { devtools } from "zustand/middleware";
import { mockCompanies } from "../mocks/companies";

interface CompanyState {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  setCompanies: (companies: Company[]) => void;

  page: number;
  setPage: (page: number) => void;
}

export const useCompanyStore = create<CompanyState>()(
  devtools(
    (set) => ({
      companies: mockCompanies,
      selectedCompany: null,
      setSelectedCompany: (company) => set({ selectedCompany: company }),
      setCompanies: (companies) => set({ companies }),

      page: 1,
      setPage: (page) => set({ page })
    }),
    { name: "CompanyStore" }
  )
);
