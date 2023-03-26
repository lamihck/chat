import { Fill, Left, Right } from 'react-spaces'
import { Clear } from './Clear.component'
import { PromptSelector } from './PromptSelector.component'

export const Header = (props) => {

  return (
    <Fill style={{backgroundColor: '#202123'}}>
      <Left size={'49%'} centerContent={'vertical'}>
        <PromptSelector/>
      </Left>
      <Right size={'49%'} centerContent={'vertical'} style={{textAlign: 'right'}}>
        <Clear/>
      </Right>
    </Fill>
  )
}