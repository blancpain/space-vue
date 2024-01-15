import { ref } from 'vue';
import type { TEpicImage } from '@/types/nasaApi';

export const getEpicImage = () => {
  const epicImages = ref<TEpicImage[]>([]);
  const loading = ref(true);
  const error = ref('');

  const fetchImage = async () => {
    try {
      const res = await fetch(
        'https://api.nasa.gov/EPIC/api/enhanced/images?api_key=' + import.meta.env.VITE_API_KEY
      );
      if (!res.ok) {
        throw Error('no data available');
      }
      const data: TEpicImage[] = await res.json();
      epicImages.value = data;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      error.value = 'no data available';
    } finally {
      loading.value = false;
    }
  };

  return { epicImages, loading, error, fetchImage };
};
