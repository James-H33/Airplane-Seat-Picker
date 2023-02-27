import { useRef, useEffect } from 'react';

const useIsMounted = () => {
  const isMounted: any = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
