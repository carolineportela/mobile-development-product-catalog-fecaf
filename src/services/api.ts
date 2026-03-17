import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const productService = {
  getProductsByCategory: async (category: string) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data.products;
  },
  getProductById: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
};

export default api;
