'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const validateFormData = (email: string, password: string) => {
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    const errors = result.error.format();
    const errorMessage =
      errors.email?._errors[0] || errors.password?._errors[0] || 'Validation error';
    toast.error(errorMessage, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    return false;
  }
  return true;
};

const authenticateUser = async (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: () => void
) => {
  try {
    const response = await axios.post(
      'https://mxagro-backend.onrender.com/api/vendor/login',
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      localStorage.setItem('vnkt', response.data.token);
      onSuccess();
    } else {
      toast.error(response.data.error || 'Please check username and password', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      onError();
    }
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error('An error occurred during login. Please try again.', {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    onError();
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData(email, password)) return;

    setIsLoading(true);

    const onSuccess = () => {
      setEmail('');
      setPassword('');
      toast.success('Login successful, you will be redirected shortly', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      router.push('/');
    };

    const onError = () => {
      setIsLoading(false);
    };

    await authenticateUser(email, password, onSuccess, onError);
  };

  return (
    <div className="bg-white comforta flex bodyText flex-row myFont">
      <div className="flex items-center w-full mt-28 md:mt-0 px-6 mx-auto md:w-[30vw]">
        <div className="flex-1">
          <div className="text-center">
            <p className="mt-12 md:mt-3 text-gray-500 text-2xl font-bold">Vendor login</p>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-green-200 rounded-lg focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-6">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-green-200 rounded-lg focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-6">
                {isLoading ? (
                  <div className="loader w-full flex justify-center items-center">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>
            <p className="mt-6 text-sm text-center text-gray-400">
              Don&apos;t have a vendor account yet?{' '}
              <Link href="signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="hidden relative md:flex bg-cover h-screen w-[70vw] bg-[url('/images/farmergovernor.webp')]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-gradient-to-t from-black to-transparent"></div>
        <h6 className="absolute myFont mt-32 inset-0 flex items-center justify-center text-5xl font-bold text-white">
          MxAgro Vendor
        </h6>
        <h3 className="absolute inset-0 text-center flex items-center justify-center mt-72 px-20 text-white text-2xl comforta">
          Log in to manage your products, track orders, and grow your business.
        </h3>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
