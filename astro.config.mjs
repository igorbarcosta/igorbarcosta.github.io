import { defineConfig } from 'astro/config';

const [owner = 'usuario', repository = 'professor-site'] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = repository === `${owner}.github.io`;
const base = process.env.BASE_PATH ?? (isGitHubActions && !isUserSite ? `/${repository}` : '');
const site = process.env.SITE_URL ?? (isGitHubActions ? `https://${owner}.github.io${base}/` : 'http://localhost:4321');

export default defineConfig({
  site,
  base,
  output: 'static',
  build: {
    format: 'directory',
  },
});
