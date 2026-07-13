import { useCallback, useRef } from 'react';
import { useRouter, type Href } from 'expo-router';

export function useNavigateOnce(lockMs = 600) {
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  return useCallback(
    (href: Href) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      router.push(href);
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, lockMs);
    },
    [router],
  );
}
