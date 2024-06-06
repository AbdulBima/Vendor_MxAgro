"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import axios from "axios";
import Image from "next/image";

const MyProducts = () => {
  const { vendorId, isLoading: tokenLoading } = useTokenVerification();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    if (!tokenLoading && !vendorId) {
      router.push("/login");
    }
  }, [tokenLoading, vendorId, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://mxagro-backend.onrender.com/api/products/vendor/${vendorId}`);
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    if (vendorId) {
      fetchProducts();
    }
  }, [vendorId]);

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://mxagro-backend.onrender.com/api/products/${productId}`);
        setProducts(products.filter((product: any) => product._id !== productId));
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error("Failed to delete product");
      }
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
      <div className='w-full comforta overflow-y-auto mt-14 px:10 pb-20 md:px-32 p-6 md:mt-8 m-auto mx-auto bg-white'>
        <h5 className='text-gray-800 mt-12 md:mt-0 text-2xl md:text-5xl text-center'>
          My Products
        </h5>
        <div className='overflow-x-auto py-16'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600'></th>
                <th className='py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600'>Name</th>
                <th className='py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600'>Price (N)</th>
                <th className='py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600'>Quantity (bags)</th>
                <th className='py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600'>Category</th>
                <th className='py-2 px-4 border-b-2 border-gray-300 dark:border-gray-600'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, index: number) => (
                <tr key={product._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className='py-2 px-4 border-b border-gray-300 dark:border-gray-600'>
                    <Image width={20} height={20} unoptimized src={product.productImage} alt={product.productName} className='w-20 h-20 object-cover' />
                  </td>
                  <td className='py-2 px-4 border-b border-gray-300 dark:border-gray-600 md:whitespace-normal whitespace-nowrap'>{product.productName}</td>
                  <td className='py-2 px-4 border-b border-gray-300 dark:border-gray-600'>{product.productPrice}</td>
                  <td className='py-2 px-4 border-b border-gray-300 dark:border-gray-600'>{product.productQuantity}</td>
                  <td className='py-2 px-4 border-b border-gray-300 dark:border-gray-600'>{product.productCategory}</td>
                  <td className='py-2 px-4 border-b border-gray-300 dark:border-gray-600 whitespace-nowrap space-x-4'>
                    <button
                      onClick={() => router.push(`/myproducts/${product._id}`)}
                      className='text-white bg-green-600 px-4 py-1 hover:opacity-80'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className='text-white bg-red-600 px-4 py-1 hover:opacity-80'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyProducts;
export const runtime = 'edge';
