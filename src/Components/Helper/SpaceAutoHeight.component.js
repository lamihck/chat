import { useResizeDetector } from 'react-resize-detector';
import { Bottom, Top } from "react-spaces";

export const SpaceAutoHeight = ({Space, margin, children}) => {
  const { width, height, ref } = useResizeDetector();

  return (
    <Space size={(Space === Bottom || Space === Top ? height : width) + (2 * margin)}>
      <div ref={ref} style={{margin: (Space === Bottom || Space === Top ? `${margin}px 0` : `0 ${margin}px`)}}>
        {children}
      </div>
    </Space>
  )
}