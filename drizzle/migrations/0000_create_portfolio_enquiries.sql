CREATE TABLE public.portfolio_enquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 kind text NOT NULL CHECK (kind IN ('booking','contact')),
 topic text NOT NULL CHECK (topic IN ('Keynote','Advisory','Media','Other')),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 organization text NOT NULL DEFAULT '' CHECK (char_length(organization) <= 200),
 preferred_date date,
 location text NOT NULL DEFAULT '' CHECK (char_length(location) <= 200),
 format text NOT NULL DEFAULT 'Virtual' CHECK (format IN ('Virtual','In person','Hybrid')),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
 status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','confirmed','declined'))
);
GRANT ALL ON public.portfolio_enquiries TO service_role;
ALTER TABLE public.portfolio_enquiries ENABLE ROW LEVEL SECURITY;