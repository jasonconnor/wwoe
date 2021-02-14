import * as S from './style'

const Nav = () => {
  return (
    <S.Nav>
      <S.NavLink to='/'>home</S.NavLink>
      <S.NavLink to='/profile'>profile</S.NavLink>
      <S.NavLink to='/login'>login</S.NavLink>
      <S.NavLink to='/register'>register</S.NavLink>
    </S.Nav>
  )
}

export default Nav