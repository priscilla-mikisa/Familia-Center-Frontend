import apiClient from "../mockApiClient";

export const ProgramService = {
  async getPrograms() {
    return apiClient.get('/programs/');
  },

  async getProgram(id: number) {
    return apiClient.get(`/programs/${id}/`);
  },

  async enrollInProgram(programId: number) {
    return apiClient.post(`/programs/${programId}/enroll/`);
  },

  async getProgramResources(programId: number) {
    return apiClient.get(`/programs/${programId}/resources/`);
  },
};