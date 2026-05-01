-- Renocheck — Supabase setup
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
-- It is safe to run more than once: drops and recreates policies/triggers.

-- =====================================================================
-- TABLES
-- =====================================================================

-- Profiles — extends auth.users with role + partner info
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'partner' CHECK (role IN ('admin', 'partner')),
  full_name TEXT,
  company TEXT,
  region TEXT,
  rubriek TEXT,
  partner_type TEXT CHECK (partner_type IN ('architect', 'vakspecialist')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx
  ON public.blog_posts (created_at DESC);

-- Events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS events_starts_at_idx
  ON public.events (starts_at);

-- =====================================================================
-- HELPERS
-- =====================================================================

-- Bypass RLS to check if a user is admin (used inside RLS policies)
CREATE OR REPLACE FUNCTION public.is_admin(uid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = uid AND role = 'admin');
$$;

-- Auto-create a profile row when a new auth.user is inserted
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, company, region, rubriek, partner_type)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company',
    NEW.raw_user_meta_data->>'region',
    NEW.raw_user_meta_data->>'rubriek',
    NEW.raw_user_meta_data->>'partner_type'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Keep blog_posts.updated_at fresh
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_touch_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_touch_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =====================================================================
-- RLS
-- =====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- ----- Profiles -----
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
CREATE POLICY "profiles_select"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "profiles_update_self" ON public.profiles;
CREATE POLICY "profiles_update_self"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- ----- Blog posts -----
DROP POLICY IF EXISTS "blog_select" ON public.blog_posts;
CREATE POLICY "blog_select"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "blog_insert_own" ON public.blog_posts;
CREATE POLICY "blog_insert_own"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "blog_update_own" ON public.blog_posts;
CREATE POLICY "blog_update_own"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "blog_delete_own" ON public.blog_posts;
CREATE POLICY "blog_delete_own"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "blog_admin_all" ON public.blog_posts;
CREATE POLICY "blog_admin_all"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- ----- Events -----
DROP POLICY IF EXISTS "events_select" ON public.events;
CREATE POLICY "events_select"
  ON public.events FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "events_insert_own" ON public.events;
CREATE POLICY "events_insert_own"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "events_update_own" ON public.events;
CREATE POLICY "events_update_own"
  ON public.events FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "events_delete_own" ON public.events;
CREATE POLICY "events_delete_own"
  ON public.events FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "events_admin_all" ON public.events;
CREATE POLICY "events_admin_all"
  ON public.events FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- =====================================================================
-- DONE
-- =====================================================================

-- After running this, create your first admin manually:
--   1) Sign up via the /login page (or via the Supabase dashboard → Authentication)
--   2) Run: UPDATE public.profiles SET role = 'admin' WHERE id = '<your-uuid>';
