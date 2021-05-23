const baseUrl = process.env.REACT_APP_BASE_URL;

export const api = {
  utils: {
    expandUrl: (shortenLink: string) => `${baseUrl}/utils/expandedUrl/${shortenLink}`
  },
  whatsapp: {
  }
}
