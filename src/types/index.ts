// CompanyMock : 테스트용 기업 데이터 (companies.ts)
export interface CompanyMock {
  id: string; //UUID
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  phone?: string;
  website?: string;
  business_hours?: string;
  rating?: number;
  is_open?: boolean;
}

// Company : 대표님 엑셀 반영 기업 데이터 (companies_mock.ts)
export interface Company {
  name: string;
  company_name: string | null;
  department?: string | null; // 선택적 필드로 변경
  position?: string | null; // 선택적 필드로 변경
  address: string;
  id: string; // UUID
  phone?: string | null; // null 허용
  website?: string | null; // null 허용
  latitude?: number; // 위도 (추후 추가 예정)
  longitude?: number; // 경도 (추후 추가 예정)
}
