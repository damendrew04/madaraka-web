'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const milestones = [
    {
        year: 1963,
        title: 'Independence Day',
        description: 'Kenya achieves independence from British colonial rule. Jomo Kenyatta becomes the first Prime Minister.',
        details: 'Marked the end of colonial rule and the start of self-governance.',
        color: 'black',
        side: 'right',
    },
    {
        year: 1964,
        title: 'Republic of Kenya',
        description: 'Kenya becomes a republic with Jomo Kenyatta as the first President, laying the foundation for the modern Kenyan state.',
        details: 'Established Kenya as a sovereign republic.',
        color: 'white',
        side: 'left',
    },
    {
        year: 1978,
        title: 'President Moi Era',
        description: 'Daniel arap Moi becomes President, leading Kenya through significant economic and social development.',
        details: 'Focused on education and infrastructure growth.',
        color: 'green',
        side: 'right',
    },
    {
        year: 1992,
        title: 'Multi-Party Democracy',
        description: 'Introduction of multi-party politics, opening democratic space and fostering political competition.',
        details: 'A pivotal shift towards pluralistic governance.',
        color: 'red',
        side: 'left',
    },
    {
        year: 2002,
        title: 'Democratic Transition',
        description: 'Mwai Kibaki wins presidency, marking a peaceful democratic transition and economic recovery.',
        details: 'Introduced free primary education and economic reforms.',
        color: 'black',
        side: 'right',
    },
    {
        year: 2007,
        title: 'M-Pesa Launch',
        description: 'Revolutionary mobile money service launches, transforming financial inclusion across Africa.',
        details: 'Pioneered mobile banking, impacting millions.',
        color: 'white',
        side: 'left',
    },
    {
        year: 2010,
        title: 'New Constitution',
        description: 'Promulgation of a progressive constitution establishing devolved government and strengthening institutions.',
        details: 'Introduced devolution and enhanced rights.',
        color: 'green',
        side: 'right',
    },
    {
        year: 2013,
        title: 'Digital Era',
        description: "Uhuru Kenyatta's presidency begins, launching Vision 2030 implementation and digital transformation.",
        details: 'Accelerated tech adoption and infrastructure.',
        color: 'red',
        side: 'left',
    },
    {
        year: 2022,
        title: 'New Leadership',
        description: 'William Ruto assumes presidency, focusing on economic transformation and digital innovation.',
        details: 'Emphasized bottom-up economic growth.',
        color: 'black',
        side: 'right',
    },
    {
        year: 2024,
        title: 'Gen Z Protest',
        description: 'Kenyan youth, led by Gen Z, organize nationwide protests advocating for economic reforms and government accountability.',
        details: 'Demonstrated the power of digital mobilization and civic engagement among young Kenyans.',
        color: 'white',
        side: 'left',
    },
    {
        year: 2025,
        title: 'Smart City Progress',
        description: 'Konza Technopolis advances as a hub for innovation, with significant milestones in smart city infrastructure.',
        details: 'Aiming for 200,000 residents and jobs by 2030.',
        color: 'green',
        side: 'right',
    },
];

export default function Timeline() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [sliderPosition, setSliderPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                const newPosition = e.key === 'ArrowUp' ? sliderPosition - 10 : sliderPosition + 10;
                const clamped = Math.max(0, Math.min(newPosition, 100));
                setSliderPosition(clamped);
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [sliderPosition]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const y = e.clientY - rect.top;
                const percentage = Math.max(0, Math.min((y / rect.height) * 100, 100));
                setSliderPosition(percentage);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'black':
                return {
                    bg: 'bg-gray-800',
                    text: 'text-gray-800',
                    gradient: 'from-gray-800/20',
                    border: 'border-gray-800'
                };
            case 'white':
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-100',
                    gradient: 'from-gray-100/20',
                    border: 'border-gray-100'
                };
            case 'green':
                return {
                    bg: 'bg-green-600',
                    text: 'text-green-400',
                    gradient: 'from-green-600/20',
                    border: 'border-green-600'
                };
            case 'red':
                return {
                    bg: 'bg-red-600',
                    text: 'text-red-400',
                    gradient: 'from-red-600/20',
                    border: 'border-red-600'
                };
            default:
                return {
                    bg: 'bg-blue-600',
                    text: 'text-blue-400',
                    gradient: 'from-blue-600/20',
                    border: 'border-blue-600'
                };
        }
    };

    return (
        <section id="milestones" className="py-20 bg-gradient-to-br from-green-800 to-red-800" ref={timelineRef}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
                        Historic Milestones
                    </h2>
                    <motion.p 
                        className="text-xl text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Key moments that shaped Kenya&#39;s path to prosperity
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Main Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 via-green-500 to-blue-500" />
                    
                    {/* Interactive Slider */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-gray-900 cursor-grab z-10 shadow-lg hover:shadow-xl transition-shadow"
                        ref={sliderRef}
                        style={{ top: `${sliderPosition}%` }}
                        onMouseDown={handleMouseDown}
                        tabIndex={0}
                        aria-label="Timeline slider"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ 
                            y: isDragging ? 0 : [0, -5, 0],
                        }}
                        transition={{ 
                            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                        }}
                    />

                    {/* Timeline Items */}
                    <div className="space-y-12">
                        {milestones.map((milestone, index) => {
                            const colorClasses = getColorClasses(milestone.color);
                            
                            return (
                                <div key={index} className="flex items-center relative">
                                    {/* Left Side Content */}
                                    <div className={`w-1/2 ${milestone.side === 'right' ? 'pr-12 text-right' : 'pl-12'}`}>
                                        {milestone.side === 'right' && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="group"
                                            >
                                                <div className={`bg-gradient-to-r ${colorClasses.gradient} to-transparent p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm`}>
                                                    <div className="mb-4">
                                                        <h3 className={`text-2xl font-bold ${colorClasses.text}`}>{milestone.year}</h3>
                                                        <h4 className="text-lg font-semibold text-white">{milestone.title}</h4>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-300 mb-2">{milestone.description}</p>
                                                        <motion.p 
                                                            className="text-sm text-gray-400"
                                                            initial={{ opacity: 0, height: 0 }}
                                                            whileHover={{ opacity: 1, height: 'auto' }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {milestone.details}
                                                        </motion.p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Timeline Dot */}
                                    <motion.div
                                        className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${colorClasses.bg} rounded-full border-4 border-gray-900 cursor-pointer z-20 shadow-lg`}
                                        tabIndex={0}
                                        aria-label={`Milestone dot for ${milestone.year}`}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: index * 0.1,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.8 }}
                                    />

                                    {/* Right Side Content */}
                                    <div className={`w-1/2 ${milestone.side === 'left' ? 'pl-12' : 'pr-12 text-right'}`}>
                                        {milestone.side === 'left' && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="group"
                                            >
                                                <div className={`bg-gradient-to-l ${colorClasses.gradient} to-transparent p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm`}>
                                                    <div className="mb-4">
                                                        <h3 className={`text-2xl font-bold ${colorClasses.text}`}>{milestone.year}</h3>
                                                        <h4 className="text-lg font-semibold text-white">{milestone.title}</h4>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-300 mb-2">{milestone.description}</p>
                                                        <motion.p 
                                                            className="text-sm text-gray-400"
                                                            initial={{ opacity: 0, height: 0 }}
                                                            whileHover={{ opacity: 1, height: 'auto' }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {milestone.details}
                                                        </motion.p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}