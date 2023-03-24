import { Fill, Left, Right } from 'react-spaces'

export const Header = (props) => {

  return (
    <Fill style={{backgroundColor: '#202123'}}>
      <Left size={'49%'} centerContent={'vertical'}>
        ¤
      </Left>
      <Right size={'49%'} centerContent={'vertical'} style={{textAlign: 'right'}}>
        ¤
      </Right>
    </Fill>
  )
}