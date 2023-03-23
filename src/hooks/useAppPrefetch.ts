import { useGetCountries } from "./../api/data/getCountries";

/**
 * useAppPrefetch hook
 *
 * Used to prefetch all data necessary for app to make
 * smoother experience going through the onboarding
 */
const useAppPrefetch = () => {
  useGetCountries();
};

export default useAppPrefetch;
