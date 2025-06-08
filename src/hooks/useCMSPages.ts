
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsService, CMSPage, CreatePageDTO, PageFilters, PaginationParams } from '@/services/cmsService';
import { useToast } from '@/hooks/use-toast';

// Query keys factory for better organization and type safety
const queryKeys = {
  all: ['cms-pages'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: PageFilters, pagination?: PaginationParams) => 
    [...queryKeys.lists(), { filters, pagination }] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
  slugs: () => [...queryKeys.all, 'slug'] as const,
  slug: (slug: string) => [...queryKeys.slugs(), slug] as const,
  versions: (id: string) => [...queryKeys.all, 'versions', id] as const,
  analytics: (id: string) => [...queryKeys.all, 'analytics', id] as const,
  homepage: () => [...queryKeys.all, 'homepage'] as const,
  search: (query: string) => [...queryKeys.all, 'search', query] as const,
  recent: (limit: number) => [...queryKeys.all, 'recent', limit] as const,
};

// Hook for fetching pages with pagination and filtering
export function useCMSPages(filters?: PageFilters, pagination?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.list(filters, pagination),
    queryFn: () => cmsService.getPages(filters, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
}

// Hook for fetching single page by ID
export function useCMSPage(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.detail(id || ''),
    queryFn: () => cmsService.getPageById(id!),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for fetching page by slug (public pages)
export function useCMSPageBySlug(slug: string | undefined, incrementView = true) {
  return useQuery({
    queryKey: queryKeys.slug(slug || ''),
    queryFn: () => cmsService.getPageBySlug(slug!, incrementView),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000, // 30 minutes for public pages
    retry: false, // Don't retry if page not found
  });
}

// Hook for homepage
export function useCMSHomepage() {
  return useQuery({
    queryKey: queryKeys.homepage(),
    queryFn: () => cmsService.getHomepage(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook for searching pages
export function useCMSPagesSearch(query: string, limit = 10) {
  return useQuery({
    queryKey: queryKeys.search(query),
    queryFn: () => cmsService.searchPages(query, limit),
    enabled: query.length >= 2, // Only search with 2+ characters
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Hook for recent pages
export function useCMSRecentPages(limit = 5) {
  return useQuery({
    queryKey: queryKeys.recent(limit),
    queryFn: () => cmsService.getRecentPages(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for all CMS page mutations
export function useCMSPageMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createPage = useMutation({
    mutationFn: (data: CreatePageDTO) => cmsService.createPage(data),
    onSuccess: (newPage) => {
      // Invalidate lists to show new page
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      // If it's set as homepage, invalidate homepage query
      if (newPage.is_homepage) {
        queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      }
      toast({
        title: "Success",
        description: "Page created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create page",
        variant: "destructive",
      });
    },
  });

  const updatePage = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePageDTO> }) => 
      cmsService.updatePage(id, data),
    onSuccess: (updatedPage, variables) => {
      // Invalidate and update specific queries
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(variables.id) });
      
      // If homepage status changed, invalidate homepage
      if (updatedPage.is_homepage || variables.data.is_homepage !== undefined) {
        queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      }
      
      // If slug changed, invalidate the old slug query
      if (variables.data.slug) {
        queryClient.invalidateQueries({ queryKey: queryKeys.slugs() });
      }
      
      toast({
        title: "Success",
        description: "Page updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update page",
        variant: "destructive",
      });
    },
  });

  const deletePage = useMutation({
    mutationFn: (id: string) => cmsService.deletePage(id),
    onSuccess: (_, id) => {
      // Remove from all relevant caches
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.removeQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      queryClient.invalidateQueries({ queryKey: queryKeys.recent(5) });
      
      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete page",
        variant: "destructive",
      });
    },
  });

  const publishPage = useMutation({
    mutationFn: (id: string) => cmsService.publishPage(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      
      toast({
        title: "Success",
        description: "Page published successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to publish page",
        variant: "destructive",
      });
    },
  });

  const unpublishPage = useMutation({
    mutationFn: (id: string) => cmsService.unpublishPage(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      
      toast({
        title: "Success",
        description: "Page unpublished successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to unpublish page",
        variant: "destructive",
      });
    },
  });

  const archivePage = useMutation({
    mutationFn: (id: string) => cmsService.archivePage(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      
      toast({
        title: "Success",
        description: "Page archived successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to archive page",
        variant: "destructive",
      });
    },
  });

  const duplicatePage = useMutation({
    mutationFn: (id: string) => cmsService.duplicatePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      
      toast({
        title: "Success",
        description: "Page duplicated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to duplicate page",
        variant: "destructive",
      });
    },
  });

  const bulkUpdateStatus = useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: 'draft' | 'published' | 'archived' }) =>
      cmsService.bulkUpdateStatus(ids, status),
    onSuccess: (_, { ids, status }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      
      // Invalidate specific page details
      ids.forEach(id => {
        queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      });
      
      // If publishing/unpublishing, might affect homepage
      if (status === 'published' || status === 'draft') {
        queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      }
      
      toast({
        title: "Success",
        description: `${ids.length} page(s) updated successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update pages",
        variant: "destructive",
      });
    },
  });

  const bulkDelete = useMutation({
    mutationFn: (ids: string[]) => cmsService.bulkDelete(ids),
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.homepage() });
      queryClient.invalidateQueries({ queryKey: queryKeys.recent(5) });
      
      // Remove specific page details from cache
      ids.forEach(id => {
        queryClient.removeQueries({ queryKey: queryKeys.detail(id) });
      });
      
      toast({
        title: "Success",
        description: `${ids.length} page(s) deleted successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete pages",
        variant: "destructive",
      });
    },
  });

  return {
    createPage,
    updatePage,
    deletePage,
    publishPage,
    unpublishPage,
    archivePage,
    duplicatePage,
    bulkUpdateStatus,
    bulkDelete,
  };
}

// Hook for page versions
export function useCMSPageVersions(pageId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.versions(pageId || ''),
    queryFn: () => cmsService.getPageVersions(pageId!),
    enabled: !!pageId,
    staleTime: 60 * 1000, // 1 minute
  });
}

// Hook for restoring page versions
export function useCMSPageVersionRestore() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ pageId, versionId }: { pageId: string; versionId: string }) =>
      cmsService.restorePageVersion(pageId, versionId),
    onSuccess: (_, { pageId }) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(pageId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.versions(pageId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      
      toast({
        title: "Success",
        description: "Page restored to selected version",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to restore page version",
        variant: "destructive",
      });
    },
  });
}

// Hook for page analytics
export function useCMSPageAnalytics(pageId: string | undefined, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: [...queryKeys.analytics(pageId || ''), { startDate, endDate }],
    queryFn: () => cmsService.getPageAnalytics(pageId!, startDate, endDate),
    enabled: !!pageId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for slug validation
export function useSlugValidation() {
  return useMutation({
    mutationFn: ({ slug, excludeId }: { slug: string; excludeId?: string }) =>
      cmsService.checkSlugAvailability(slug, excludeId),
  });
}

// Utility hook for slug generation
export function useSlugGeneration() {
  return useMutation({
    mutationFn: (title: string) => Promise.resolve(cmsService.generateSlug(title)),
  });
}

// Export query keys for external use
export { queryKeys };
