"use client";

import React, { useState, useEffect } from "react";
import { z, ZodError } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import useTokenVerification from "../../../../components/hooks/useTokenVerification";
import axios from "axios";

const UpdateProduct = () => {
  const { vendorId, isLoading: tokenLoading } = useTokenVerification();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const router = useRouter();
  const { productId } = useParams();

  const [formData, setFormData] = useState({
    productName: "",
    productLocation: "",
    productPrice: "",
    productQuantity: "",
    productDescription: "",
    productImage: "",
    productCategory: "cereals",
    productVendor: "",
  });

  useEffect(() => {
    if (!tokenLoading && !vendorId) {
      router.push("/login");
    }
  }, [tokenLoading, vendorId, router]);

  useEffect(() => {
    if (vendorId) {
      setFormData((prevData) => ({
        ...prevData,
        productVendor: vendorId,
      }));
    }
  }, [vendorId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://mxagro-backend.onrender.com/api/products/${productId}`);
        const product = response.data;
        setFormData({
          productName: product.productName,
          productLocation: product.productLocation,
          productPrice: product.productPrice.toString(),
          productQuantity: product.productQuantity.toString(),
          productDescription: product.productDescription,
          productImage: product.productImage,
          productCategory: product.productCategory,
          productVendor: product.productVendor._id,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const schema = z.object({
    productName: z.string().min(2, { message: "Product name must be at least 2 characters long" }),
    productLocation: z.string().min(2, { message: "Product location must be at least 2 characters long" }),
    productPrice: z.number().min(0, { message: "Product price must be a positive number" }),
    productQuantity: z.number().min(0, { message: "Product quantity must be a positive number" }),
    productDescription: z.string().min(10, { message: "Product description must be at least 10 characters long" }),
    productImage: z.string().url({ message: "Invalid URL" }),
    productCategory: z.enum(['cereals', 'vegetables', 'tubers']),
    productVendor: z.string(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const validatedData = schema.parse({
        ...formData,
        productPrice: parseFloat(formData.productPrice),
        productQuantity: parseInt(formData.productQuantity, 10),
      });
      const response = await updateProduct(validatedData);
      handleSuccess(response);
    } catch (error) {
      handleError(error);
    }

    setIsUpdateLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuccess = (response: any) => {
    toast.success(`Product ${response.productName} Updated`);
    router.push("/myproducts"); // Navigate to products list after successful update
  };

  const handleError = (error: any) => {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0].message;
      toast.error(errorMessage);
    } else {
      console.error("An error occurred:", error);
      toast.error("An error occurred while updating the product");
    }
  };

  const updateProduct = async (productData: any) => {
    try {
      const response = await axios.put(
        `https://mxagro-backend.onrender.com/api/products/updte/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  };

  if (tokenLoading || isLoading) {
    return (
      <div className='loader w-full h-full flex justify-center items-center'>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
    );
  }

  return (
    <>
      <div className='w-full comforta mt-14 mb-20 p-6 md:mt-8 m-auto mx-auto bg-white '>
        <h5 className=' text-gray-800 mt-10 md:mt-0 text-2xl md:text-5xl text-center'>
          Update Product
        </h5>
        <form className=' mt-12 md:mt-16 px-6 md:px-80' onSubmit={handleSubmit}>
          <div className='mt-5'>
            <label htmlFor='productName' className='block text-sm text-gray-800 dark:text-gray-200'>
              Product Name
            </label>
            <input
              type='text'
              name='productName'
              value={formData.productName}
              onChange={handleInputChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mt-5'>
            <label htmlFor='productLocation' className='block text-sm text-gray-800 dark:text-gray-200'>
              Product Location
            </label>
            <input
              type='text'
              name='productLocation'
              value={formData.productLocation}
              onChange={handleInputChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mt-5'>
            <label htmlFor='productPrice' className='block text-sm text-gray-800 dark:text-gray-200'>
              Price ( N )
            </label>
            <input
              type='text'
              name='productPrice'
              value={formData.productPrice}
              onChange={handleInputChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mt-5'>
            <label htmlFor='productQuantity' className='block text-sm text-gray-800 dark:text-gray-200'>
              Quantity ( bags )
            </label>
            <input
              type='text'
              name='productQuantity'
              value={formData.productQuantity}
              onChange={handleInputChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mt-5'>
            <label htmlFor='productDescription' className='block text-sm text-gray-800 dark:text-gray-200'>
              Description
            </label>
            <input
              type='text'
              name='productDescription'
              value={formData.productDescription}
              onChange={handleInputChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mt-5'>
            <label htmlFor='productImage' className='block text-sm text-gray-800 dark:text-gray-200'>
              Product Image URL
            </label>
            <input
              type='text'
              name='productImage'
              value={formData.productImage}
              onChange={handleInputChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mt-5'>
            <label htmlFor='productCategory' className='block text-sm text-gray-800 dark:text-gray-200'>
              Product Category
            </label>
            <select
              name='productCategory'
              value={formData.productCategory}
              onChange={handleInputChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            >
              <option value='cereals'>Cereals</option>
              <option value='vegetables'>Vegetables</option>
              <option value='tubers'>Tubers</option>
            </select>
          </div>
          <div className='mt-10'>
            <button
              type='submit'
              disabled={isUpdateLoading}
              className='w-full flex justify-center items-center px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50'
            >
              {isUpdateLoading ? <div className='loader w-full flex justify-center items-center '>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
              </div> : "Update Product"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProduct;
export const runtime = 'edge';
