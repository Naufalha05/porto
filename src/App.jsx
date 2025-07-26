import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AboutMe from './components/AboutMe'
import Project from './components/Project'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  )
}

export default App