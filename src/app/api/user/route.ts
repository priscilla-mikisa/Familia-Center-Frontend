import apiClient from "../mockApiClient";

export const UserService = {
  async getUsers() {
    return apiClient.get('/users/');
  },

  async getUser(id: number) {
    return apiClient.get(`/users/${id}/`);
  },

  async getCounselors() {
    return apiClient.get('/counselors/');
  },

  async updateUser(id: number, data: any) {
    return apiClient.patch(`/users/${id}/`, data);
  },
};