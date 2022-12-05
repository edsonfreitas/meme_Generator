import { useState } from 'react'
import GlobalStyles from './styles/global'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GlobalStyles/>
    <Home /> 
    </>
  )
}

export default App
