"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import Image from 'next/image';

interface Product {
    _id: string;
    productName: string;
    productLocation: string;
    productPrice: number;
    productQuantity: number;
    productQuantityPurchased: number;
    productDescription: string;
    productImage: string;
    productCategory: string;
    totalProductPurchasedAmount: number;
    createdAt: string;
    updatedAt: string;
}

interface Order {
    _id: string;
    buyerId: string;
    buyerEmail: string;
    buyerContact: string;
    buyerAddress: string;
    buyerCity: string;
    buyerState: string;
    orderAmount: number;
    status: string;
    order: Product | Product[];
    createdAt: string;
    updatedAt: string;
}

const OrdersByVendor: React.FC = () => {
    const { vendorId, isLoading: tokenLoading } = useTokenVerification();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        if (!tokenLoading && !vendorId) {
            router.push("/login");
        }
    }, [router, tokenLoading, vendorId]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://mxagro-backend.onrender.com/api/order/vendor/${vendorId}`);
                if (response.data && Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    toast.error("Unexpected response format");
                }
                setIsLoading(false);
            } catch (error) {
                toast.error("Error fetching orders");
                console.error("Error fetching orders:", error);
                setIsLoading(false);
            }
        };

        if (vendorId) {
            fetchOrders();
        }
    }, [vendorId]);

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US').format(amount);
    };

    const handleMarkAsDelivered = async (orderId: string) => {
        try {
            await axios.patch(`https://mxagro-backend.onrender.com/api/order/${orderId}/deliver`);
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: 'Delivered' } : order
            ));
            toast.success("Order marked as delivered");
        } catch (error) {
            toast.error("Error marking order as delivered");
            console.error("Error marking order as delivered:", error);
        }
    };

    const renderOrderDetails = (order: Order, index: number) => (
        <div key={order._id} className="mb-14 border-t-2 mt-10 border-green-500">
            <div className="bg-green-[30]  p-4 rounded-md shadow-sm mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h6 className="text-xl font-bold  text-green-700">Order {index + 1}</h6>
                    <span className={`status ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.status}
                    </span>
                </div>
              <div className="flex  mt-8  flex-col justify-between"> 
                
    <div className="grid grid-cols-1 md:grid-cols-2 text-sm gap-4">
        <p className="flex items-center mb-2 odd:bg-gray-100 even:bg-gray-200  p-2 rounded">
            <strong className="mr-2">Email:</strong>
            <span className="text-gray-700 ">{order.buyerEmail}</span>
        </p>
        <p className="flex items-center mb-2 odd:bg-gray-100 even:bg-gray-200  p-2 rounded">
            <strong className="mr-2">Contact:</strong>
            <span className="text-gray-700 ">{order.buyerContact}</span>
        </p>
        <p className="flex items-center mb-2 odd:bg-gray-100 even:bg-gray-200  p-2 rounded">
            <strong className="mr-2">Address:</strong>
            <span className="text-gray-700 ">{order.buyerAddress}</span>
        </p>
        <p className="flex items-center mb-2 odd:bg-gray-100 even:bg-gray-200  p-2 rounded">
            <strong className="mr-2">City:</strong>
            <span className="text-gray-700 ">{order.buyerCity}</span>
        </p>
        <p className="flex items-center mb-2 odd:bg-gray-100 even:bg-gray-200  p-2 rounded">
            <strong className="mr-2">State:</strong>
            <span className="text-gray-700 ">{order.buyerState}</span>
        </p>
        {/* <p className="flex items-center mb-2 odd:bg-gray-100 even:bg-gray-200  p-2 rounded">
            <strong className="mr-2">Total Order Amount ( N ):</strong>
            <span className="text-gray-700 ">{formatAmount(order.orderAmount/100)}</span>
        </p> */}
    </div>


                <div>
                {order.status !== 'Delivered' && (
                    <button
                        onClick={() => handleMarkAsDelivered(order._id)}
                        className=" px-4 py-2 bg-orange-600 text-white mt-6 hover:bg-yellow-500"
                    >
                        Mark as Delivered
                    </button>
                )} </div>
                </div>
            </div>.
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white ">
                    <thead>
                        <tr>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Price ( N )</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total Amount ( N )</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(order.order) ? (
                            order.order.map((product) => (
                                <tr key={product._id}>
                                    <td className="border px-4 py-2">
                                        <Image width={12} height={12} unoptimized src={product.productImage} alt={product.productName} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="border px-4 py-2">{product.productName}</td>
                                    <td className="border px-4 py-2">{formatAmount(product.productPrice)}</td>
                                    <td className="border px-4 py-2">{product.productQuantityPurchased}</td>
                                    <td className="border px-4 py-2">{formatAmount(product.totalProductPurchasedAmount)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-4 py-2">
                                    <Image width={12} height={12} unoptimized  src={order.order.productImage} alt={order.order.productName} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="border px-4 py-2">{order.order.productName}</td>
                                <td className="border px-4 py-2">{formatAmount(order.order.productPrice)}</td>
                                <td className="border px-4 py-2">{order.order.productQuantityPurchased}</td>
                                <td className="border px-4 py-2">{formatAmount(order.order.totalProductPurchasedAmount)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="w-full comforta mt-14 px-6 md:px-32 pb-20 p-6 m-auto bg-white ">
            <h5 className="text-gray-800 text-2xl md:text-5xl text-center mb-8">My Orders</h5>
            {isLoading ? (
                <div className="loader w-full h-full mt-40 flex justify-center items-center">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            ) : (
                <div>
                    {orders.length > 0 ? (
                        orders.map((order, index) => renderOrderDetails(order, index))
                    ) : (
                        <div className="text-center py-4">
                            No orders found for this vendor.
                        </div>
                    )}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default OrdersByVendor;
export const runtime = 'edge';
