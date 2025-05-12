
export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
  created_at?: string;
  status?: string;
};

export type Appointment = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  appointment_date?: string;
  status?: string;
  notes?: string;
  created_at?: string;
};

export type Testimonial = {
  id?: string;
  name: string;
  company: string;
  service: string;
  rating: number;
  testimonial: string;
  image_url?: string;
  is_approved?: boolean;
  created_at?: string;
};
