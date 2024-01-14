import { ref } from 'vue';
import type { TDailyPic } from '@/types/nasaApi';
import { API_KEY } from '@/config/api';
import { formatDate } from '@/utils';

export const getDailyPic = () => {
  const dailyPic = ref<TDailyPic>({});
  const loading = ref(true);
  const error = ref('');

  const fetchPic = async (date: Date) => {
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${formatDate(date)}&api_key=${API_KEY}`
      );
      if (!res.ok) {
        throw Error('no data available');
      }
      const data: TDailyPic = await res.json();
      dailyPic.value = data;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      error.value = 'no data available';
    } finally {
      loading.value = false;
    }
  };

  return { dailyPic, loading, error, fetchPic };
};
