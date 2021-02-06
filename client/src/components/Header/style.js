import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const Header = styled.header`
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: center;
`

export const Wrapper = styled.div`
  align-items: center;
  background: #eee;
  display: flex;
  justify-content: space-between;
  width: 980px;
`

export const Nav = styled.nav`
  display: flex;
`

export const NavLink = styled(Link)`
  color: pink;
  padding: 5px 10px;
  text-decoration: none;
`