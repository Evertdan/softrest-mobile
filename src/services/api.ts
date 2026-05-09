import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:4000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error reading auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('auth_token');
  },
};

export const ordersApi = {
  getOrders: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await api.get('/orders', { params });
    return response.data;
  },
  
  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  updateOrderStatus: async (id: string, status: string) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export const tablesApi = {
  getTables: async () => {
    const response = await api.get('/tables');
    return response.data;
  },
  
  updateTableStatus: async (id: string, status: string) => {
    const response = await api.patch(`/tables/${id}`, { status });
    return response.data;
  },
};

export const productsApi = {
  getProducts: async (category?: string) => {
    const params = category ? { category } : {};
    const response = await api.get('/products', { params });
    return response.data;
  },
};

export const customersApi = {
  getCustomers: async () => {
    const response = await api.get('/customers');
    return response.data;
  },
  
  getCustomerById: async (id: string) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },
};

export const paymentsApi = {
  getPendingPayments: async () => {
    const response = await api.get('/payments/pending');
    return response.data;
  },
  
  processPayment: async (orderId: string, method: string) => {
    const response = await api.post(`/payments`, { orderId, method });
    return response.data;
  },
};

export default api;
