import apiClient from "../mockApiClient";

export const ResourcesService = {
  getResources: (params?: { category?: string; search?: string }) =>
    apiClient.get('/resources', { params }),
  uploadResource: (formData: FormData) =>
    apiClient.post('/resources', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  downloadResource: (resourceId: string) =>
    apiClient.get(`/resources/${resourceId}/download`, {
      responseType: 'blob',
    }),
};