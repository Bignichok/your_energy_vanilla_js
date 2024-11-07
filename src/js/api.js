import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-energy.b.goit.study/api',
  headers: {
    Accept: 'application/json',
  },
});

export const fetchFilters = async filterType => {
  try {
    const response = await api.get('/filters', {
      params: {
        filter: filterType,
        page: 1,
        limit: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching filters:', error);
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
