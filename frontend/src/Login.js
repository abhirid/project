import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    let valid = true;
    setErrors({
      email: '',
      password: '',
    });
    if (!email) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
      valid = false;
    }
    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
      valid = false;
    }

    if (valid) {
      try {
        const response = await axios.post('https://authproject-oeni.onrender.com/auth/login', { email, password });
        const { accessToken, refreshToken, userId,name } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('name', name); 
        toast.success('Login successful');
        navigate('/home');
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || 'Login failed');
        } else {
          toast.error('Login failed');
        }
      }
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            onChange={handleChange}
            name='email'
            value={loginInfo.email}
            placeholder='Enter your email'
          />
          {errors.email && <p className='error'>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            onChange={handleChange}
            name='password'
            value={loginInfo.password}
            placeholder='Enter your password'
          />
          {errors.password && <p className='error'>{errors.password}</p>}
        </div>
        <button type='submit'>Login</button>
        <span>Doesn't have an account? <Link to="/signup">Signup</Link></span>
      </form>
     
    </div>
  );
};

export default Login;
