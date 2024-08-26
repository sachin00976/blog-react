import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authservice from '../../appwrite/auth'; 
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authservice.logout()
      .then(() => {
        dispatch(logout());
        navigate('/login');  // Navigate to the home page after successful logout
      })
      .catch((error) => {
        console.log("Error during logout:", error);
      });
  }

  return (
    <button
      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
