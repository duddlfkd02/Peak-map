export interface Company {
  id: string; //UUID
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  phone?: string;
  website?: string;
}
