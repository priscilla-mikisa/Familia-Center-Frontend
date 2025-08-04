import { useState, useEffect } from 'react';
import { ResourcesService } from '../api/resources/route';

export const useResources = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async (params?: { category?: string; search?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ResourcesService.getResources(params);
      setResources(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResource = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await ResourcesService.uploadResource(formData);
      await fetchResources();
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const downloadResource = async (resourceId: string) => {
    try {
      const response = await ResourcesService.downloadResource(resourceId);
      return response;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return {
    resources,
    isLoading,
    error,
    fetchResources,
    uploadResource,
    downloadResource,
  };
};