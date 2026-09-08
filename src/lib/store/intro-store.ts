export let isInitialLoad = true;

export const markInitialLoadComplete = () => {
  isInitialLoad = false;
};
