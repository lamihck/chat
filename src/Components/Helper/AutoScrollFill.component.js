import _ from 'lodash';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Fill } from 'react-spaces';

export const AutoScrollFill = (props) => {
  const [ref, setRef] = useState()
  
  useLayoutEffect(() => {
    handleResize()
  }, [props.children, ref]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  const _handleResize = () => {
    if(ref?.lastElementChild)
    ref.lastElementChild.scrollIntoView({ /*behavior: "smooth",*/ block: "end" })
  }

  const handleResize = _.debounce(_handleResize, 200)

  return (
    <Fill {...props} onScroll={() => console.info('onScroll')}>
      <span ref={r => setRef(r?.parentNode)} />
      {props.children}
    </Fill>
  );
}