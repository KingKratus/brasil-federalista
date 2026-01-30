-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  city TEXT,
  state TEXT,
  is_young_leader BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create manifest_signatures table
CREATE TABLE public.manifest_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  city TEXT,
  state TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on manifest_signatures
ALTER TABLE public.manifest_signatures ENABLE ROW LEVEL SECURITY;

-- Public can view signatures count (not individual data)
CREATE POLICY "Anyone can insert signatures" 
ON public.manifest_signatures FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can count signatures" 
ON public.manifest_signatures FOR SELECT USING (true);

-- Create text_suggestions table for GitHub-like suggestions
CREATE TABLE public.text_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type TEXT NOT NULL CHECK (document_type IN ('pec', 'lei')),
  document_id TEXT NOT NULL,
  original_text TEXT NOT NULL,
  suggested_text TEXT NOT NULL,
  justification TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on text_suggestions
ALTER TABLE public.text_suggestions ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved suggestions
CREATE POLICY "Anyone can view suggestions" 
ON public.text_suggestions FOR SELECT USING (true);

-- Authenticated users can insert suggestions
CREATE POLICY "Authenticated users can insert suggestions" 
ON public.text_suggestions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own pending suggestions
CREATE POLICY "Users can update their own pending suggestions" 
ON public.text_suggestions FOR UPDATE 
USING (auth.uid() = user_id AND status = 'pending');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_text_suggestions_updated_at
BEFORE UPDATE ON public.text_suggestions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on new user
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();