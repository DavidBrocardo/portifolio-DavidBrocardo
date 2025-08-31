import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portifolio-DavidBrocardo/', 
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        projetos: 'projetos.html',
      },
    },
  },
});