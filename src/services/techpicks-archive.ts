import { searchLinkInRepository } from './github';

export const isLinkAlreadySent = async (link: string) => {
  const cleanedLink = cleanLink(link);

  // TODO - add local cache (maybe in indexDB) to reduce request to the API on the same link
  const { total_count } = await searchLinkInRepository({
    link: cleanedLink,
    owner: 'rluvaton',
    repo: 'techpicks-archive'
  });

  return total_count > 0;
}

function cleanLink(link: string): string {
  return link.trim().replace(/#.*$/g, '');
}
