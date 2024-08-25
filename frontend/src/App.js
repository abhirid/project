import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import 'react-toastify/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;
