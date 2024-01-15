import type { TEpicImage } from '@/types';
import { extractDate } from '.';
export const buildEpicUrl = (epicImage: TEpicImage) => {
  if (epicImage.identifier) {
    const { year, month, day } = extractDate(epicImage.identifier);
    return `https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/${day}/png/${epicImage.image}.png`;
  }
};
