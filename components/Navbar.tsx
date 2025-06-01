'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            setIsOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-gray-500 backdrop-blur-md border-b border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-2xl font-bold bg-gradient-to-r from-black via-white to-red-700 bg-clip-text text-transparent">
                        MAGLEV TECH AFRIKA
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {['Home', 'Journey', 'Milestones', 'Future'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
                                onClick={(e) => handleSmoothScroll(e, `#${item.toLowerCase()}`)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        className="md:hidden text-white hover:bg-gray-800"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            )}
                        </svg>
                    </Button>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
                        <div className="flex flex-col space-y-4 pt-4">
                            {['Home', 'Journey', 'Milestones', 'Future'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                                    onClick={(e) => handleSmoothScroll(e, `#${item.toLowerCase()}`)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}