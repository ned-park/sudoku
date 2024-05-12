/* 
  update to https://stackoverflow.com/questions/71543415/how-to-change-the-url-prefix-for-fetch-calls-depending-on-dev-vs-prod-environmen
*/

export const __SITE_PREFIX__ = import.meta.env.VITE_SITE_PREFIX ?? "http://localhost:3001";
