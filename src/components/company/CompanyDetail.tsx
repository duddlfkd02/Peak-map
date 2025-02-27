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
    <div className="space-y-2 p-2">
      <h2 className="text-xl font-bold">{company.name}</h2>
      <p className="text-sm text-[#333333]">{company.address}</p>
      <div className="space-y-2">
        <p className="flex gap-2 text-sm">
          <img src={phone} alt="전화 아이콘" />
          {company.phone}
        </p>
        <p className="flex gap-2 text-sm">
          <img src={web} alt="웹 아이콘" />
          {company.website}
        </p>
      </div>

      <div className="flex justify-between">
        {company.phone && (
          <Button
            label="전화하기"
            onClick={() => (window.location.href = `tel:${company.phone}`)}
            className="text-sm"
          />
        )}
        {company.website && (
          <Button
            label="홈페이지"
            variant="secondary"
            onClick={() => window.open(company.website, "_blank")}
            className="text-sm"
          />
        )}

        <Button
          label="공유하기"
          variant="outline"
          onClick={() => window.open(company.website, "_blank")}
          className="text-sm"
        />
      </div>
      <Button label="닫기" variant="outline" onClick={() => setSelectedCompany(null)} className="w-full" />
    </div>
  );
};

export default CompanyDetail;
