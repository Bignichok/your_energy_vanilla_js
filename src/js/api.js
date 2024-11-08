import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-energy.b.goit.study/api',
  headers: {
    Accept: 'application/json',
  },
});

export const fetchCategories = async (filter = 'Muscles', page = 1) => {
  try {
    const response = await api.get('/filters', {
      params: {
        filter,
        page,
        limit: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const fetchQuote = async () => {
  try {
    const response = await api.get('/quote');
    return response.data;
  } catch (error) {
    console.error('Error fetching the quote:', error);
  }
};
