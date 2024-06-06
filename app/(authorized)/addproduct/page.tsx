'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { z, ZodError } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import axios from "axios";

const productSchema = z.object({
    productName: z.string().min(2, { message: "Product name must be at least 2 characters long" }),
    productLocation: z.string().min(2, { message: "Product location must be at least 2 characters long" }),
    productPrice: z.number().min(0, { message: "Product price must be a positive number" }),
    productQuantity: z.number().min(0, { message: "Product quantity must be a positive number" }),
    productDescription: z.string().min(10, { message: "Product description must be at least 10 characters long" }),
    productImage: z.string().url({ message: "Invalid URL" }),
    productCategory: z.enum(['cereals', 'vegetables', 'tubers']),
    productVendor: z.string(),
});

const AddProduct: React.FC = () => {
    const { vendorId, isLoading } = useTokenVerification();
    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const router = useRouter();

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
        if (!isLoading && !vendorId) {
            router.push("/login");
        }
    }, [isLoading, vendorId, router]);

    useEffect(() => {
        if (vendorId) {
            setFormData((prevData) => ({
                ...prevData,
                productVendor: vendorId,
            }));
        }
    }, [vendorId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsAddLoading(true);

        try {
            const validatedData = productSchema.parse({
                ...formData,
                productPrice: parseFloat(formData.productPrice),
                productQuantity: parseInt(formData.productQuantity, 10),
            });
            const response = await addProduct(validatedData);
            handleSuccess(response);
        } catch (error) {
            handleError(error);
        }

        setIsAddLoading(false);
    };

    const addProduct = async (productData: any) => {
        try {
            const response = await axios.post(
                'https://mxagro-backend.onrender.com/api/products/create',
                productData
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to add product');
        }
    };

    const handleSuccess = (response: any) => {
        toast.success(`Product ${response.productName} Added`);
        setFormData({
            productName: "",
            productLocation: "",
            productPrice: "",
            productQuantity: "",
            productDescription: "",
            productImage: "",
            productCategory: "cereals",
            productVendor: vendorId || "",
        });
    };

    const handleError = (error: any) => {
        if (error instanceof ZodError) {
            const errorMessage = error.errors[0].message;
            toast.error(errorMessage);
        } else {
            console.error("An error occurred:", error);
            toast.error("An error occurred while adding the product");
        }
    };

    if (isLoading) {
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
            <div className='w-full comforta overflow-y-auto mt-14 pb-20 p-6 md:mt-8 m-auto mx-auto bg-white'>
                <h5 className='text-black text-2xl mt-10 md:mt-0 md:text-5xl text-center'>
                    Add a new product
                </h5>
                <form className='mt-12 md:mt-16 px-6 md:px-80' onSubmit={handleSubmit}>
                    {['productName', 'productLocation', 'productPrice', 'productQuantity', 'productDescription', 'productImage'].map((field) => (
                        <div className='mt-5' key={field}>
                            <label htmlFor={field} className='block text-sm text-black'>
                                {field.split(/(?=[A-Z])/).join(' ')}
                            </label>
                            <input
                                type='text'
                                name={field}
                                value={(formData as any)[field]}
                                onChange={handleInputChange}
                                className='block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            />
                        </div>
                    ))}
                    <div className='mt-5'>
                        <label htmlFor='productCategory' className='block text-sm text-black'>
                            Product Category
                        </label>
                        <select
                            name='productCategory'
                            value={formData.productCategory}
                            onChange={handleInputChange}
                            className='block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                        >
                            {['cereals', 'vegetables', 'tubers'].map((category) => (
                                <option value={category} key={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-10'>
                        <button
                            type='submit'
                            disabled={isAddLoading}
                            className='w-full flex justify-center items-center px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50'
                        >
                            {isAddLoading ? (
                                <div className='loader w-full flex justify-center items-center'>
                                    <span className='bar'></span>
                                    <span className='bar'></span>
                                    <span className='bar'></span>
                                </div>
                            ) : (
                                "Add Product"
                            )}
                        </button>
                    </div>
                </form>
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

export default AddProduct;
