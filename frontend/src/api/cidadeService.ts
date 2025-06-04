import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // sem / no final
});

export const getCidades = async () => {
  const response = await api.get('/cidade'); // ou ajuste se for outro endpoint
  return response.data;
};

export const getIrradiacao = async (id: number) => {
  const response = await api.get(`/cidade/${id}`);
  return response.data;
};

