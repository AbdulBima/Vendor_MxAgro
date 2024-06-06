"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SideNav = () => {


	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		window.localStorage.removeItem("vnkt");

		router.push("/login");
	};

	// if (isLoading) {
	// 	return (
	// 		<div className='flex justify-center w-full items-center h-screen'>
	// 			<div className='loaderR'>
	// 				<div className='bar1'></div>
	// 				<div className='bar2'></div>
	// 				<div className='bar3'></div>
	// 				<div className='bar4'></div>
	// 				<div className='bar5'></div>
	// 				<div className='bar6'></div>
	// 				<div className='bar7'></div>
	// 				<div className='bar8'></div>
	// 				<div className='bar9'></div>
	// 				<div className='bar10'></div>
	// 				<div className='bar11'></div>
	// 				<div className='bar12'></div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	
		return (
			<div className='comforta '>
				{/* Sidebar */}
				<div className='absolute left-0 flex h-screen w-72 flex-col overflow-hidden  bg-green-800 text-white'>
					<Link href="/" className='mt-10 myFont  ml-10 text-3xl font-bold'>
						MxAgro
					</Link>
					<ul className='mt-20 space-y-3'>
						<li
							className={
								pathname === "/"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link href='/'
								className=' flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
										/>
									</svg>
								</span>
								<span className=''>
									Dashboard
								</span>
							</Link>
						</li>

						<li
							className={
								pathname === "/addproduct"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link href='/addproduct'
								className=' flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 4v16m-8-8h16'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</span>
								<span className=''>
									Add Product
								</span>
							</Link>
						</li>

						<li
							className={
								pathname.startsWith(
									"/myproducts"
								)
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link href='/myproducts'
								className=' flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</span>
								<span className=''>
									My Products
								</span>
							
							</Link>
						</li>

						

					

						<li
							className={
								pathname ===
								"/orders"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link href='/orders'
								className=' flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M5 20h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zm0-10h14m-14 4h14'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</span>
								<span className=''>
									Orders
								</span>
							</Link>
						</li>
					</ul>

					

					<button
						className='flex mt-32 items-center px-2 py-2 mb-6 ml-8 text-white  hover:opacity-70'
						onClick={handleLogout}
					>
						<svg
							className='w-5 h-5'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16 17l5-5-5-5M21 12H9'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						<span className=' mx-4 font-medium'>
							Logout
						</span>
					</button>
				</div>
			</div>
		);


};

export default SideNav;
