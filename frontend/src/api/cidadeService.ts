import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getCidades = async () => {
  const response = await api.get('/cidade');
  return response.data;
};

export const getIrradiacao = async (id: number) => {
  const response = await api.get(`/cidade/${id}`);
  return response.data;
};

