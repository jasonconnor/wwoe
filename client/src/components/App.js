import {BrowserRouter as Router} from 'react-router-dom'

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <Main />
      <Footer />
    </Router>
  )
}

export default App