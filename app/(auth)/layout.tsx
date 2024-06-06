import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Vendor MxAgro",
	description:
		"Login to your vendor dahboard.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className=''>
				<div className='overflow-x-hidden w-[100vw] h-[100vh] md:overflow-y-hidden overflow-y-auto comforta'>
					
					 {children}
				</div>
			
			</body>
		</html>
	);
}
