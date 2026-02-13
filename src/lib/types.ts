export interface UserType {
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  address?: {
    city?: string | null;
    zipcode?: string | null;
    geo?: { lat?: string | null; lng?: string | null };
  };
  createdAt?: Date;
  updatedAt?: Date;
}
