// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://danmorgan.co.uk',
  // Emit flat files (library-lite.html) so existing links keep working.
  build: { format: 'file' },
});
