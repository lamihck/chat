import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Fill } from 'react-spaces';

export const AutoScrollFill = (props) => {
  const [ref, setRef] = useState()
  let timeout = useRef(null)

  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  useLayoutEffect(() => {
    handleResize()
  }, [props.children, ref]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  const _handleResize = () => {
    if(ref?.lastElementChild)
    ref.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  const handleResize = debounce(_handleResize, 1000)

  return (
    <Fill {...props} onScroll={() => console.info('onScroll')}>
      <span ref={r => setRef(r?.parentNode)} />
      {props.children}
    </Fill>
  );
}