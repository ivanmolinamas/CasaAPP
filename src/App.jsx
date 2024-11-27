import './App.css'
import Layout from './components/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import "@radix-ui/themes/styles.css";


function App() {

  return (

    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  )
}

export default App
