
-- Drop existing policies that reference 'moderator'
DROP POLICY IF EXISTS "Admins can manage all cms pages" ON public.cms_pages;
DROP POLICY IF EXISTS "Content creators can manage their own pages" ON public.cms_pages;
DROP POLICY IF EXISTS "Users can view versions of accessible pages" ON public.cms_page_versions;
DROP POLICY IF EXISTS "Admins can manage all page versions" ON public.cms_page_versions;
DROP POLICY IF EXISTS "Admins can view all analytics" ON public.cms_page_analytics;
DROP POLICY IF EXISTS "System can update analytics" ON public.cms_page_analytics;

-- Create updated RLS policies using only existing roles
-- Policy for admins to manage all pages
CREATE POLICY "Admins can manage all cms pages" ON public.cms_pages
  FOR ALL TO authenticated
  USING (public.get_user_role() = 'admin');

-- Policy for content creators to manage their own drafts
CREATE POLICY "Content creators can manage their own pages" ON public.cms_pages
  FOR ALL TO authenticated
  USING (
    created_by = auth.uid() OR 
    public.get_user_role() = 'admin'
  );

-- Policies for page versions
CREATE POLICY "Users can view versions of accessible pages" ON public.cms_page_versions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cms_pages 
      WHERE id = page_id 
      AND (
        created_by = auth.uid() OR 
        public.get_user_role() = 'admin' OR
        (status = 'published' AND is_active = true AND deleted_at IS NULL)
      )
    )
  );

CREATE POLICY "Admins can manage all page versions" ON public.cms_page_versions
  FOR ALL TO authenticated
  USING (public.get_user_role() = 'admin');

-- Policies for analytics
CREATE POLICY "Admins can view all analytics" ON public.cms_page_analytics
  FOR SELECT TO authenticated
  USING (public.get_user_role() = 'admin');

CREATE POLICY "Page creators can view their page analytics" ON public.cms_page_analytics
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cms_pages 
      WHERE id = page_id AND created_by = auth.uid()
    )
  );

CREATE POLICY "System can update analytics" ON public.cms_page_analytics
  FOR ALL TO authenticated
  USING (public.get_user_role() = 'admin');
