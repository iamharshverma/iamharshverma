CREATE FUNCTION public.limit_portfolio_enquiries() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtext(lower(NEW.email)));
 IF (SELECT count(*) FROM public.portfolio_enquiries WHERE lower(email) = lower(NEW.email) AND created_at > now() - interval '1 hour') >= 5 THEN
 RAISE EXCEPTION 'Please wait before submitting another enquiry.';
 END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER limit_portfolio_enquiries BEFORE INSERT ON public.portfolio_enquiries FOR EACH ROW EXECUTE FUNCTION public.limit_portfolio_enquiries();