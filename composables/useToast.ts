import type { AxiosError } from 'axios';
import { toast, type ToastContainerOptions, type ToastOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useToast = () => {
  const defaultOptions:ToastOptions = {
    autoClose: 3000,
    type: 'error',
  };

  const showToast = (message: string, error?: AxiosError, options = defaultOptions) => {
    const fullMessage = error ? `${message}: ${(error as AxiosError).message}` : message;
    toast(fullMessage, options);
  };

  return {
    showToast,
  };
};
