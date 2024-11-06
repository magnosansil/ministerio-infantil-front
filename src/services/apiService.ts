import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getRequest = async <T>(url: string): Promise<T> => {
  const response = await api.get<T>(url);
  return response.data;
};

export const postRequest = async <T>(url: string, data: T): Promise<void> => {
  await api.post(url, data);
};

export const deleteRequest = async (url: string): Promise<void> => {
  await api.delete(url);
};

export const patchRequest = async <T>(url: string, data: T): Promise<void> => {
  await api.patch(url, data);
};