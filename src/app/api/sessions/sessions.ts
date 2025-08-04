import apiClient from "../mockApiClient";

export const SessionService = {
  async getSessions(params?: { upcoming?: boolean }) {
    return apiClient.get('/sessions/', { params });
  },

  async getSession(id: number) {
    return apiClient.get(`/sessions/${id}/`);
  },

  async bookSession(sessionId: number) {
    return apiClient.post(`/sessions/${sessionId}/book/`);
  },

  async submitFeedback(sessionId: number, feedback: string) {
    return apiClient.post(`/sessions/${sessionId}/feedback/`, { feedback });
  },
};