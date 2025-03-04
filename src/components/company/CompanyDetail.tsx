import Button from "../common/Button";
import phone from "../../assets/images/phone ico.svg";
import web from "../../assets/images/web ico.svg";
import { useCompanyStore } from "../../stores/useCompanyStore";
import { useMemo } from "react";

const CompanyDetail = () => {
  const { selectedCompany, setSelectedCompany } = useCompanyStore();
  const company = useMemo(() => selectedCompany, [selectedCompany]);
  if (!company) return null;

  return (
    <div className="mt-4 space-y-4 rounded-lg border p-4 dark:border-gray-500 dark:bg-darkGray dark:text-lightGray">
      <h2 className="text-xl font-bold text-black dark:text-lightGray">{company.name}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">{company.address}</p>

      <div className="space-y-2">
        <p className="flex items-center gap-2 text-sm text-black dark:text-lightGray">
          <img src={phone} alt="전화 아이콘" className="h-4 w-4" />
          {company.phone}
        </p>
        <p className="flex items-center gap-2 text-sm text-black dark:text-lightGray">
          <img src={web} alt="웹 아이콘" className="h-4 w-4" />
          {company.website}
        </p>
      </div>

      <div className="flex justify-between">
        {company.phone && (
          <Button
            label="전화하기"
            onClick={() => (window.location.href = `tel:${company.phone}`)}
            className="bg-primary text-sm text-white hover:bg-opacity-90"
          />
        )}
        {company.website && (
          <Button
            label="홈페이지"
            variant="secondary"
            onClick={() => {
              if (company.website) {
                window.open(company.website, "_blank");
              }
            }}
            className="text-sm hover:bg-opacity-90"
          />
        )}

        <Button
          label="공유하기"
          variant="outline"
          onClick={() => {
            if (company.website) {
              window.open(company.website, "_blank");
            }
          }}
          className="border-gray-500 text-sm text-black hover:bg-gray-200 dark:border-gray-600 dark:text-lightGray dark:hover:bg-gray-700"
        />
      </div>

      <Button
        label="닫기"
        variant="outline"
        onClick={() => setSelectedCompany(null)}
        className="w-full border-gray-500 text-black hover:bg-gray-200 dark:border-gray-600 dark:text-lightGray dark:hover:bg-gray-700"
      />
    </div>
  );
};

export default CompanyDetail;
