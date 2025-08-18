-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to manage user permissions
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::app_role)
$$;

-- Add RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add admin-only read access to appointments table
CREATE POLICY "Admins can view all appointments" 
ON public.appointments 
FOR SELECT 
TO authenticated
USING (public.is_admin());

-- Add admin-only update access to appointments table
CREATE POLICY "Admins can update appointments" 
ON public.appointments 
FOR UPDATE 
TO authenticated
USING (public.is_admin());

-- Add admin-only delete access to appointments table  
CREATE POLICY "Admins can delete appointments" 
ON public.appointments 
FOR DELETE 
TO authenticated
USING (public.is_admin());

-- Do the same for contact_submissions table for consistency
CREATE POLICY "Admins can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (public.is_admin());