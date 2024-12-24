import axios from 'axios';

export const useApi = () => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { api };
}