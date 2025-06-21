import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Cards from './components/Cards'
import Decks from './components/Decks'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/decks" element={<Decks />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
