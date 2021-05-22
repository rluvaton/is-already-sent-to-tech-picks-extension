import { api } from '../shared/api';

export const expandUrl = async (shortenLink: string): Promise<string> => {
  const { link } = await fetch(api.utils.expandUrl(shortenLink)).then(res => res.json()).catch(e => ({}));

  return link;
};
