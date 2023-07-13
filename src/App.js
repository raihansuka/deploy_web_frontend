import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';


const App = () => {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  // Check if the user is authenticated
  const isAuthenticated = token ? true : false;

  // Get the role from the token (assuming the token has a 'role' claim)
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : '';
  console.log(role);

  return (
    <BrowserRouter>
    <Header />
      <Routes>
      <Route path='/login' element={<LoginPage />} />
        <Route path="/" element={isAuthenticated ? <Navigate to={role === 'admin' ? '/admin' : '/user'} /> : <Navigate to="/login" />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path='/register' element={<RegisterPage />} />
        {/* Add other routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
