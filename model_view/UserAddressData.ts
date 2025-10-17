export interface UserAddressData {
  user_id: number;
  full_name: string;
  phone: string;
  province_id: number;
  district_id: number;
  ward_id: number;
  address_detail: string;
  address_type: number;
  is_default: boolean;
  updated_at?: Date;
}
