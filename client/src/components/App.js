import {BrowserRouter as Router} from 'react-router-dom'

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'

import GlobalStyle from './GlobalStyle'

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Main />
      <Footer />
    </Router>
  )
}

export default App