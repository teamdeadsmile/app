import { useRouter } from 'expo-router';

export function useGoBack(fallback = '/') {
  const router = useRouter();

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallback);
    }
  }

  return goBack;
}