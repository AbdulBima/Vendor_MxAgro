import DashNav from "@/components/mobileCom/DashNav";
import SideNav from "@/components/navigation/SideNav";
import "@/app/globals.css";

export const metadata = {
	title: "Vendor MxAgro",
	description: "Vendor Dashboard",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<div className='bodyText flex md:flex-row w-screen h-[100vh]'>
					<div className='hidden z-[80] h-[100vh] md:flex w-[20vw] flex-none bg-gray-700'>
						<SideNav />
					</div>
					<main className='  md:mt-0 overflow-y-auto overflow-x-hidden md:w-[80vw] w-[100vw] bg-white'>
						<DashNav />
						{children}
				
					</main>
				</div>
			</body>
		</html>
	);
}
