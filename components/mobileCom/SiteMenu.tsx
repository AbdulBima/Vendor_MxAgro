"use client";


import React from "react";
import { usePathname, useRouter } from "next/navigation";
// import useTokenVerification from "../hooks/useTokenVerification";
import Image from "next/image";
import Link from "next/link";

interface SiteMenuProps {
	closeMenu: () => void; // Prop to close the menu
}

const SiteMenu: React.FC<SiteMenuProps> = ({
	closeMenu,
}) => {


	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		window.localStorage.removeItem("vnkt");

		router.push("/login");
	};

	const handleLinkClick = () => {
		closeMenu(); // Close the menu
	};


	
		return (
			<div className='min-h-screen comforta md:hidden h-screen fixed bg-green-800 z-[80] w-[85vw]'>
			
				<div className='absolute  flex h-screen md:w-72 w-full  z-[70] flex-col overflow-hidden rounded-r-2xl  text-white'>
					<ul className='mt-28 space-y-2'>
						<li
							onClick={handleLinkClick}
							className={
								pathname === "/"
									? " relative flex w-[85vw] cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex w-[85vw] cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link
								href='/'
								className=' flex flex-row space-x-4'
							>
							
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
							onClick={handleLinkClick}
							className={
								pathname === "/addproduct"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link
								href='/addproduct'
								className=' flex flex-row space-x-4'
							>
							
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
							onClick={handleLinkClick}
							className={
								pathname.startsWith(
									"/myproducts"
								)
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link
								href='/myproducts'
								className=' flex flex-row space-x-4'
							>
							
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
							onClick={handleLinkClick}
							className={
								pathname === "/orders"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white bg-green-700 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white hover:bg-green-600 "
							}
						>
							<Link
								href='/orders'
								className=' flex flex-row space-x-4'
							>
							
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<circle
											cx='10.5'
											cy='10.5'
											r='7.5'
											stroke='currentColor'
											strokeWidth='2'
										/>
										<path
											d='M15.5 15.5L20 20'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
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
							className='w-6 h-6'
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

export default SiteMenu;
