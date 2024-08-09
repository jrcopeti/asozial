import { useCallback } from 'react';

function useMergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return useCallback(
    (node: T) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      });
    },
    [refs]
  );
}

export default useMergeRefs;
