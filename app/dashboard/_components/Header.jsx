import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const Header = () => {
    return (
        <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center p-5 shadow-sm">
                    <div className="flex-shrink-0">
                        <Image src="/favicon.svg" width={120} height={80} alt="favicon" className="object-contain" />
                    </div>
                    <div className="flex-grow mx-4 flex justify-center">
                        <Image src="/animated-header.svg" width={500} height={200} alt="header" className="object-contain" />
                    </div>
                    <div className="flex-shrink-0">
                        <UserButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;