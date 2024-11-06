import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryString = (params: Record<string, string>): string => {
  const cleaned: Record<string, string> = {};
  for (const key in params) {
    if (params[key]) cleaned[key] = params[key];
  }
  const query = new URLSearchParams(cleaned).toString();
  return query ? `?${query}` : '';
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

export const getRating = (rating: number) => (rating % 1 === 0 ? rating : rating.toFixed(1));

export const getReleaseYear = (media: TvShow | Movie) => {
  const dateStr = (media as Movie).release_date || (media as TvShow).first_air_date;
  return dateStr ? new Date(dateStr).getFullYear() : null;
};

export const getMediaType = (media: TvShow | Movie): 'movie' | 'tv' => {
  if (media.media_type) return media.media_type;
  if ((media as Movie).release_date !== undefined) {
    return 'movie';
  } else if ((media as TvShow).first_air_date !== undefined) {
    return 'tv';
  }
  throw new Error('Unknown media type');
};
