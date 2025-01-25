import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    const navigation = {
        courses: [
            { name: 'All Courses', href: '/courses' },
            { name: 'Popular', href: '/courses/popular' },
            { name: 'New', href: '/courses/new' }
        ],
        legal: [
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' }
        ],
        github: [
            { name: 'Repository', href: 'https://github.com/mindforge' },
            { name: 'Issues', href: 'https://github.com/mindforge/issues' },
            { name: 'Documentation', href: 'https://github.com/mindforge/docs' }
        ]
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#6366F1]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className='flex items-center gap-3'>
                            <Image
                                src="/favicon.svg"
                                width={100}
                                height={100}
                                alt='icon'
                                className='text-white filter brightness-0 invert'
                            />
                            <h2 className="text-2xl font-bold text-white">Mind Forge</h2>
                        </div>
                        <p className="text-gray-200">
                            Transforming education through AI-powered learning experiences.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Courses</h3>
                        <ul className="space-y-2">
                            {navigation.courses.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-200 hover:text-white">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {navigation.legal.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-200 hover:text-white">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className='flex items-center gap-2 mb-4'>
                            <h3 className="text-white font-semibold">GitHub</h3>
                            <Image
                                src="/github.png"
                                width={25}
                                height={25}
                                alt="GitHub"
                                className="filter brightness-0 invert"
                            />
                        </div>
                        <ul className="space-y-2">
                            {navigation.github.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-200 hover:text-white">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200/20">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 md:mb-0">
                            <Facebook className="h-6 w-6 text-white hover:text-gray-200 cursor-pointer" />
                            <Image
                                src="/twitter.png"
                                width={100}
                                height={100}
                                className="h-6 w-6 text-white hover:text-gray-200 cursor-pointer filter brightness-0 invert"
                            />
                            <Instagram className="h-6 w-6 text-white hover:text-gray-200 cursor-pointer" />
                            <Linkedin className="h-6 w-6 text-white hover:text-gray-200 cursor-pointer" />
                        </div>
                        <p className="text-gray-200 text-sm">
                            © {currentYear} Mind Forge. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;