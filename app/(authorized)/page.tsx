"use client"
import React, { useEffect, useState } from "react";
import useTokenVerification from "../../components/hooks/useTokenVerification";
import axios from "axios";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { vendorId, isLoading } = useTokenVerification();
    const [vendorName, setVendorName] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!vendorId && !isLoading) {
            router.push('/login');
        }
    }, [vendorId, isLoading, router]);

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const response = await axios.get(`https://mxagro-backend.onrender.com/api/vendor/vendorId/${vendorId}`);
                const { first_name, last_name } = response.data;
                setVendorName(`${first_name} ${last_name}`);
            } catch (error) {
                console.error("Error fetching vendor details:", error);
            }
        };

        if (vendorId) {
            fetchVendorDetails();
        }
    }, [vendorId]);

    if (isLoading) {
        return <div className='loader w-full h-full flex justify-center items-center'>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
    }

    return (
        <div className="bg-gray-50 comforta px-8 md:px-32 py-10 font-sans text-[#333]">
            <h2 className="hidden md:flex text-3xl mt-16 font-bold mb-14 text-center">Welcome back, <span className="text-orange-500 font-bold"> {vendorName}</span></h2>
            <h2 className="md:hidden text-xl mt-20 font-semibold mb-14 text-center">Welcome back,<br></br><span className="text-orange-500 font-bold"> {vendorName}</span></h2>

            <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
                <div className="bg-white flex gap-6 max-lg:flex-col rounded-2xl md:p-8 p-6 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.2)]">
                    <h3 className="text-2xl font-extrabold">5.4<span className="text-orange-500">K+</span></h3>
                    <div>
                        <p className="text-base font-bold">Total Customers</p>
                        <p className="text-sm text-gray-500 mt-2 justify">You have successfully reached over 5.4K customers, expanding your market reach and boosting sales.</p>
                    </div>
                </div>
                <div className="bg-white flex gap-6 max-lg:flex-col rounded-2xl md:p-8 p-6 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.2)]">
                    <h3 className="text-2xl font-extrabold">N80<span className="text-orange-500">K</span></h3>
                    <div>
                        <p className="text-base font-bold">Revenue</p>
                        <p className="text-sm text-gray-500 mt-2">Your total revenue has reached N80K, reflecting the success of your products and sales strategies.</p>
                    </div>
                </div>
                <div className="bg-white flex gap-6 max-lg:flex-col rounded-2xl md:p-8 p-6 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.2)]">
                    <h3 className="text-2xl font-extrabold">100<span className="text-orange-500">K</span></h3>
                    <div>
                        <p className="text-base font-bold">Engagements</p>
                        <p className="text-sm text-gray-500 mt-2">You have achieved 100K engagements, indicating strong customer interaction and interest in your offerings.</p>
                    </div>
                </div>
                <div className="bg-white flex gap-6 max-lg:flex-col rounded-2xl md:p-8 p-6 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.2)]">
                    <h3 className="text-2xl font-extrabold">99.9<span className="text-orange-500">%</span></h3>
                    <div>
                        <p className="text-base font-bold">Server Uptime</p>
                        <p className="text-sm text-gray-500 mt-2">Our platform guarantees 99.9% server uptime, ensuring your store is always accessible to customers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
export const runtime = "edge";
