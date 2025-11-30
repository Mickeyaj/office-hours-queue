import './App.css';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import ProfessorPage from './pages/ProfessorPage';
import StudentPage from './pages/StudentPage';
import Login from './components/Auth/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/professor/login" element={<Login role="professor" />} />
            <Route path="/student/login" element={<Login role="student" />} />
            <Route path="/professor" element={<ProfessorPage />} />
            <Route path="/student" element={<StudentPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
