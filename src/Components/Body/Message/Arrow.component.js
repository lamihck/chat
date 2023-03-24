import style from './Arrow.module.css'

export const Arrow = ({rotate}) => {

  return (
    <div className={style.Container}>
      <div className={[style.TriangleShadow, rotate ? style.RightShadow : style.LeftShadow].join(' ')}/>
      <div className={[style.Triangle, rotate ? style.Right : style.Left].join(' ')}/>
    </div>
  )
}