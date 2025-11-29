export type BusinessCategory = 
  | 'Gym' 
  | 'Salon' 
  | 'Coaching Centre' 
  | 'Yoga Studio' 
  | 'Dance Academy' 
  | 'Fitness Studio' 
  | 'Tuition Centre' 
  | 'Tiffin Service' 
  | 'Martial Arts' 
  | 'Custom Subscription';

export interface Customer {
  id: string;
  full_name: string;
  phone_number: string;
  joining_date: string; // YYYY-MM-DD
  subscription_end_date: string; // YYYY-MM-DD
  subscription_type: string;
  amount: number;
  notes: string;
  status: 'Active' | 'Expired';
  created_month: string; // YYYY-MM format for analytics
}

export interface User {
  email: string;
  name: string;
  password?: string; // For mock auth
  category?: BusinessCategory;
  businessName?: string;
}

export interface ChartData {
  month: string;
  newCustomers: number;
}