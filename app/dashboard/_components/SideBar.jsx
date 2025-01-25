"use client"
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { HiCircleStack, HiHome, HiMiniPower, HiMiniShieldCheck } from "react-icons/hi2";

function SideBar() {
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
    const { signOut } = useClerk();
    const router = useRouter();
    const path = usePathname();

    // Menu items without logout
    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <HiHome />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Explore',
            icon: <HiCircleStack />,
            path: '/dashboard/explore'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: <HiMiniShieldCheck />,
            path: '/dashboard/upgrade'
        }
    ];

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <div className="fixed h-full md:w-64 p-5 shadow-md">
            <Image src={"/logo.svg"} width={150} height={80} alt="Logo" />
            <hr className="my-5" />
            <ul>
                {Menu.map((item, index) => (
                    <Link href={item.path} key={item.id}>
                        <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3
                        ${item.path === path && 'bg-gray-100 text-black'}`}>
                            <div className="text-2xl">{item.icon}</div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
                {/* Separate logout button */}
                <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3"
                >
                    <div className="text-2xl"><HiMiniPower /></div>
                    <h2>LogOut</h2>
                </div>
            </ul>
            <div className="absolute bottom-10 w-[80%]">
                <Progress value={(userCourseList?.length / 5) * 100} />
                <h2 className="text-sm my-2">{userCourseList?.length} Out of 5 Course Created</h2>
                <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited Course generate</h2>
            </div>
        </div>
    )
}

export default SideBar