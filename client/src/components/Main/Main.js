import {Switch, Route} from 'react-router-dom'

import Index from '../Index/Index'
import LoginForm from '../Forms/LoginForm'
import RegistrationForm from '../Forms/RegistrationForm'

import * as S from './style'

const Main = () => {
  return (
    <S.Main>
      <S.Wrapper>
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/register' component={RegistrationForm} />
        </Switch>
      </S.Wrapper>
    </S.Main>
  )
}

export default Main