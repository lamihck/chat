import { useEffect, useState } from 'react';
import { Fill } from 'react-spaces';

export const AutoScrollFill = (props) => {
  const [ref, setRef] = useState()

  useEffect(() => {
    if (ref) ref.scrollTop = ref.scrollHeight;
  });

  return (
    <Fill {...props}>
      <span ref={r => setRef(r?.parentNode)} />
      {props.children}
    </Fill>
  );
}