import { ref } from 'vue';
import type { TEpicImage } from '@/types/nasaApi';
import { extractDate } from '@/utils';

export const getEpicImage = () => {
  const epicImage = ref<TEpicImage>({});
  const epicImageURL = ref('');
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
      // NOTE: the EPIC API returns an array of images (seems to be 10?), but we only want the first one which is the most recent
      epicImage.value = data[0];

      if (epicImage.value.identifier) {
        const { year, month, day } = extractDate(epicImage.value.identifier);
        epicImageURL.value = `https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/${day}/png/${epicImage.value.image}.png`;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      error.value = 'no data available';
    } finally {
      loading.value = false;
    }
  };

  return { epicImageURL, loading, error, fetchImage };
};
