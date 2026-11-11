CREATE TABLE public.portfolio_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  list text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, list)
);
GRANT ALL ON public.portfolio_subscribers TO service_role;
ALTER TABLE public.portfolio_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service role manages subscribers" ON public.portfolio_subscribers FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE OR REPLACE FUNCTION public.validate_subscriber() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.list NOT IN ('newsletter','book-beyond-ai-engineering','book-ai-vs-ai') THEN RAISE EXCEPTION 'invalid list'; END IF;
  IF length(NEW.email) > 255 OR NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN RAISE EXCEPTION 'invalid email'; END IF;
  NEW.email := lower(trim(NEW.email));
  RETURN NEW;
END $$;
CREATE TRIGGER validate_subscriber BEFORE INSERT ON public.portfolio_subscribers FOR EACH ROW EXECUTE FUNCTION public.validate_subscriber();