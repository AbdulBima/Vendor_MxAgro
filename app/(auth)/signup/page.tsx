'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import Link from 'next/link';

const signUpSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  contact: z.string().min(1, { message: 'Contact is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string().min(6, { message: 'Confirm Password must be at least 6 characters long' }),
  marketingAccept: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const validateSignUpFormData = (formData: any) => {
  const validation = signUpSchema.safeParse(formData);
  if (!validation.success) {
    validation.error.errors.forEach((error) => {
      toast.error(error.message, {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    });
    return false;
  }
  return true;
};

const registerVendor = async (
  formData: any,
  onSuccess: () => void,
  onError: () => void
) => {
  try {
    const response = await axios.post(
      'https://mxagro-backend.onrender.com/api/vendor/register',
      formData
    );
    if (response.status === 200) {
      onSuccess();
    }
  } catch (error) {
    console.error('Error signing up:', error);
    toast.error('Error signing up. Please try again.', {
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

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    marketingAccept: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateSignUpFormData(formData)) return;

    setIsLoading(true);

    const onSuccess = () => {
      toast.success('Vendor successfully created', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
        marketingAccept: false,
      });
      setIsLoading(false);
      router.push('/login');
    };

    const onError = () => {
      setIsLoading(false);
    };

    await registerVendor(formData, onSuccess, onError);
  };

  return (
    <>
      <div className='bg-white h-auto py-4 md:py-0 w-full flex comforta flex-row'>
        <div className='flex items-center w-full pt-14 md:mt-0 px-6 mx-auto md:w-[40vw]'>
          <div className='flex-1'>
            <div className='text-center md:hidden'>
              <p className='mt-12 md:mt-3 text-black text-xl '>
                Vendor Sign up
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className='flex md:flex-row space-y-2 md:space-y-0 flex-col'>
                  <div className='md:grid md:grid-cols-2 mt-2 space-x-4'>
                    <div className='mt-6 ml-3'>
                      <label htmlFor='first_name' className='block mb-2 text-sm text-gray-800'>
                        First Name
                      </label>
                      <input
                        type='text'
                        name='first_name'
                        id='first_name'
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className='block w-full px-4 md:w-[53] py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-green-400  focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <label htmlFor='last_name' className='block mb-2 text-sm text-gray-800'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        name='last_name'
                        id='last_name'
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg   focus:border-green-400  focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <label htmlFor='email' className='block mb-2 text-sm text-gray-800'>
                        Email
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-green-400  focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <label htmlFor='contact' className='block mb-2 text-sm text-gray-800'>
                        Phone Number
                      </label>
                      <input
                        type='text'
                        name='contact'
                        id='contact'
                        value={formData.contact}
                        onChange={handleInputChange}
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg   focus:border-green-400  focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <label htmlFor='password' className='block mb-2 text-sm text-gray-800'>
                        Password
                      </label>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-green-400  focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <label htmlFor='confirmPassword' className='block mb-2 text-sm text-gray-800'>
                        Confirm Password
                      </label>
                      <input
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-green-400  focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <label htmlFor='marketingAccept' className='inline-flex items-center mb-2 text-sm text-gray-800'>
                        <input
                          type='checkbox'
                          name='marketingAccept'
                          id='marketingAccept'
                          checked={formData.marketingAccept}
                          onChange={handleInputChange}
                          className='form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out'
                        />
                        <span className='ml-2 text-left whitespace-nowrap w-20'>
                          Accept marketing communications
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className='mt-16'>
                  {isLoading ? (
                    <div className='loader w-full flex justify-center items-center'>
                      <span className='bar'></span>
                      <span className='bar'></span>
                      <span className='bar'></span>
                    </div>
                  ) : (
                    <>
                      <button
                        type='submit'
                        className='w-full flex justify-center items-center px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50'
                      >
                        Sign up
                      </button>
                      <div className='mt-6 text-sm text-center text-gray-400'>
                        Already have an account?
                        <Link href='/login' className='ml-2 text-green-500 focus:outline-none focus:underline hover:underline'>
                          Login
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden relative md:flex bg-cover h-screen w-[60vw] bg-[url('/images/farmergovernor.webp')]">
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent'></div>
          <div className='absolute top-0 left-0 w-full h-full opacity-60 bg-gradient-to-t from-black to-transparent'></div>

          <h6 className='absolute myFont mt-32 inset-0 flex items-center justify-center text-5xl font-bold text-white'>
            MxAgro Vendor
          </h6>
          <h3 className='absolute inset-0 text-center flex items-center justify-center mt-72 px-20 text-white text-2xl comforta'>
            Connect with farmers and vendors across Nigeria. Sign up to start selling, manage your inventory, and expand your business.
          </h3>
        </div>
      </div>

      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SignUp;
