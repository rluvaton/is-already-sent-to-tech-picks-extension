import { Octokit } from '@octokit/core';

const octokit = new Octokit({});

export const searchLinkInRepository = async ({ link, owner, repo }: {
  link: string,
  owner: string,
  repo: string
}): Promise<{ total_count: number } & any> => {
  return await octokit.request('GET /search/code', {
    accept: 'application/vnd.github.v3+json',
    q: `${link.trim()}+repo:${owner}/${repo}`,
    per_page: 1,
  }).then((res) => res.data);
}
