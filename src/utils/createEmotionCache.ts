// import modules
import createCache from '@emotion/cache';

// define browser
const isBrowser = typeof document !== 'undefined';

// define emotion cache for overriding style
const createEmotionCache = () => {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]');
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
};

// export emotion cache
export { createEmotionCache };
