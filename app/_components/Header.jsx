"use client"
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push(`/sign-in?redirect_url=${encodeURIComponent('http://localhost:3000/dashboard')}`);
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm absolute top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center p-5 shadow-sm">
                    <div className="flex-shrink-0">
                        <Image src="/logo.svg" width={200} height={100} alt="Logo" className="object-contain" />
                    </div>
                    <div className="flex-grow mx-4 flex justify-center">
                        <Image src="/animated-header.svg" width={500} height={200} alt="header" className="object-contain mt-0" />
                    </div>
                    <div className="flex-shrink-0">
                        <Button onClick={handleGetStarted}>Get Started</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;