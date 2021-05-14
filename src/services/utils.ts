import { api } from '../shared/api';

export const isValidHttpUrl = (url: string): boolean => {
  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch (_) {
    return false;
  }

  return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
};

export const expandUrl = async (shortenLink: string): Promise<string> => {
  const { link } = await fetch(api.utils.expandUrl(shortenLink)).then(res => res.json()).catch(e => ({}));

  return link;
};
