import { mergeConfig } from 'vite';

export default (config) => {
  return mergeConfig(config, {
    optimizeDeps: {
      include: ['fuzzysort', 'extend'],
    },
  });
};
