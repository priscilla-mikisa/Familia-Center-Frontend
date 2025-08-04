import apiClient from "../mockApiClient";

export const MessagesService = {
  getConversations: () => apiClient.get('/messages/conversations'),
  getMessages: (conversationId: string) =>
    apiClient.get(`/messages/${conversationId}`),
  sendMessage: (conversationId: string, content: string) =>
    apiClient.post(`/messages/${conversationId}`, { content }),
};