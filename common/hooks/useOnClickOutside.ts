import { useEffect, MutableRefObject, EventHandler } from 'react';

export const useOnClickOutside = (ref:MutableRefObject<any>, handler:Function) => {
  useEffect(() => {
      // TODO: TypeScript
        const listener = (event:any) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    },
        [ref, handler],
    );
};