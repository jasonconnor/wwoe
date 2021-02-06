import Nav from './Nav'

import * as S from './style'

const Header = () => {
  return (
    <S.Header>
      <S.Wrapper>
        <h1>What Would Olivia Eat</h1>

        <Nav />
      </S.Wrapper>
    </S.Header>
  )
}

export default Header