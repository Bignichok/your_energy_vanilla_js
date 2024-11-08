import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-energy.b.goit.study/api',
  headers: {
    Accept: 'application/json',
  },
});

export const fetchCategories = async (filter = 'Muscles', page = 1) => {
  const isMobile = window.innerWidth < 768;
  const limit = isMobile ? 9 : 12;

  try {
    const response = await api.get('/filters', {
      params: {
        filter,
        page,
        limit,
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

export const fetchExercises = async ({
  bodypart = '',
  muscles = '',
  equipment = '',
  keyword = '',
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await api.get('/exercises', {
      params: {
        bodypart,
        muscles,
        equipment,
        keyword,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
};
