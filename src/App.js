import {  BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import UserPage from './UserPage';


function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/user" element={<UserPage />} /> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
