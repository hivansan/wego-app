import { useEffect, useRef } from 'react';

export default function usePrevious(data) {
  const ref = useRef();
  useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}
