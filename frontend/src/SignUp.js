import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const SignUp = () => {
  const [signupInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'male',
    address: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setSignUpInfo(prevState => ({
        ...prevState,
        gender: value
      }));
    } else {
      setSignUpInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      name: '',
      email: '',
      password: '',
      address: ''
    });

    const { name, email, password, address } = signupInfo;
    let valid = true;
    if (!name) {
      setErrors(prevErrors => ({ ...prevErrors, name: 'Name is required' }));
      valid = false;
    }
    if (!email) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
      valid = false;
    }
    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
      valid = false;
    }
    if (!address) {
      setErrors(prevErrors => ({ ...prevErrors, address: 'Address is required' }));
      valid = false;
    }

    if (valid) {
      try {
        await axios.post('https://authproject-oeni.onrender.com/auth/signup', signupInfo);
        toast.success('Signup successful, redirecting to login...');
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || 'Signup failed');
        } else {
          toast.error('Signup failed');
        }
      }
    }
  };

  return (
    <div className='container'>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            onChange={handleChange}
            name='name'
            value={signupInfo.name}
            autoFocus
            placeholder='Enter your name'
          />
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            onChange={handleChange}
            name='email'
            value={signupInfo.email}
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
            value={signupInfo.password}
            placeholder='Enter your password'
          />
          {errors.password && <p className='error'>{errors.password}</p>}
        </div>
        <div>
          <legend>Gender</legend>
          <label>
            <input
              type='radio'
              name='gender'
              value='male'
              checked={signupInfo.gender === 'male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type='radio'
              name='gender'
              value='female'
              checked={signupInfo.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <textarea
            name='address'
            onChange={handleChange}
            value={signupInfo.address}
            placeholder='Enter your address'
          ></textarea>
          {errors.address && <p className='error'>{errors.address}</p>}
        </div>
        <button type='submit'>SignUp</button>
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
};

export default SignUp;
