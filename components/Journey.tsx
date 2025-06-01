'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface IndustryEvent {
  rank: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  gdpContribution: string;
  isActive?: boolean;
}

interface ProgressDetails {
  text: string;
  x: number;
  y: number;
}

interface SlideImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export default function Journey() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [progressDetails, setProgressDetails] = useState<ProgressDetails | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image slider data
  const slideImages: SlideImage[] = [
    {
      src: "/images/genz.jpeg",
      alt: "Kenya Economic Growth Visualization",
      title: "Economic Growth 2024",
      subtitle: "Driving Innovation & Progress"
    },
    {
      src: "/images/genz1.jpeg",
      alt: "Kenya Agriculture Sector",
      title: "Agricultural Excellence",
      subtitle: "Feeding the Nation & Beyond"
    },
    {
      src: "/images/genz2.jpeg",
      alt: "Kenya Technology Hub",
      title: "Silicon Savannah",
      subtitle: "Tech Innovation Leader"
    },
    {
      src: "/images/genz3.jpeg",
      alt: "Kenya Tourism Industry",
      title: "Safari & Heritage",
      subtitle: "World-Class Destinations"
    },
    {
      src: "/images/genz4.jpeg",
      alt: "Kenya Manufacturing Sector",
      title: "Industrial Growth",
      subtitle: "Made in Kenya"
    }
  ];

  const industryEvents: IndustryEvent[] = [
    {
      rank: '#1',
      title: 'Services Sector',
      description: 'Financial services, telecommunications, retail, and professional services drive Kenya\'s economy, contributing over half of GDP.',
      gdpContribution: '55.5%',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L6.17 8.17L2 12.34L3.41 13.75L6.17 11L10.5 13.66L17.83 6.34L20.5 9H21Z" />
        </svg>
      ),
      color: 'bg-blue-600',
    },
    {
      rank: '#2',
      title: 'Agriculture & Food Security',
      description: 'Tea, coffee, flowers, and food crops form the backbone of Kenya\'s economy, employing millions and feeding the nation.',
      gdpContribution: '21.3%',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22V16H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V16H2V14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M5,16V20H19V16H5M5,14H19A5,5 0 0,0 14,9H10A5,5 0 0,0 5,14Z" />
        </svg>
      ),
      color: 'bg-green-600',
    },
    {
      rank: '#3',
      title: 'Manufacturing',
      description: 'Textile production, food processing, automotive assembly, and industrial manufacturing contribute significantly to GDP.',
      gdpContribution: '14%',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M12,8L5.5,14L7,15.5L12,10.5L17,15.5L18.5,14L12,8ZM18.5,16L17,17.5L12,12.5L7,17.5L5.5,16L12,9.5L18.5,16Z" />
        </svg>
      ),
      color: 'bg-purple-600',
    },
    {
      rank: '#4',
      title: 'Tourism & Hospitality',
      description: 'Safari tourism, coastal attractions, and cultural heritage sites make Kenya a top destination, contributing substantially to GDP.',
      gdpContribution: '12%',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11M12,2A6,6 0 0,0 6,8C6,12.5 12,19 12,19S18,12.5 18,8A6,6 0 0,0 12,2Z" />
        </svg>
      ),
      color: 'bg-orange-600',
    },
    {
      rank: '#5',
      title: 'Information & Technology',
      description: 'Kenya\'s Silicon Savannah leads Africa in fintech innovation with M-Pesa, tech startups, and digital transformation.',
      gdpContribution: '8.5%',
      icon: (
        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
          <path d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M10,7H15V17H10V19A1,1 0 0,0 11,20H13V22H10.5C9.95,22 9,21.55 9,21C9,21.55 8.05,22 7.5,22H5V20H7A1,1 0 0,0 8,19V5A1,1 0 0,0 7,4H5V2H7.5C8.05,2 9,2.45 9,3C9,2.45 9.95,2 10.5,2H13V4H11A1,1 0 0,0 10,5V7M2,7H7V17H2V7Z" />
        </svg>
      ),
      color: 'bg-cyan-600',
    },
  ];

  const industryStats = [
    { label: 'GDP Value (USD)', value: '$131.7B', color: 'bg-red-500/30' },
    { label: 'Growth Rate', value: '5.1%', color: 'bg-green-500/30' },
    { label: 'Employment Rate', value: '85%', color: 'bg-blue-500/30' },
    { label: 'Export Value', value: '$7.2B', color: 'bg-purple-500/30' },
  ];

  useEffect(() => {
    const currentRef = journeyRef.current;
    
    // Simple intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Auto-advance industry events
    const industryInterval = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % industryEvents.length);
    }, 4000);

    // Auto-advance image slider
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 5000);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearInterval(industryInterval);
      clearInterval(imageInterval);
    };
  }, [isAnimated, industryEvents.length, slideImages.length]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setProgressDetails({
      text: 'Kenya\'s diverse economy: Services lead at 55.5%, followed by agriculture, manufacturing, tourism, and tech innovation.',
      x: e.clientX,
      y: e.clientY,
    });
    setTimeout(() => setProgressDetails(null), 3000);
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
  };

  const backgroundPatterns = [
    { top: '10%', left: '5%', delay: '0s' },
    { top: '25%', right: '10%', delay: '1s' },
    { bottom: '15%', left: '8%', delay: '2s' },
  ];

  return (
    <section 
      id="journey" 
      className="py-20 bg-gradient-to-br from-black  to-red-600 text-white relative overflow-hidden" 
      ref={journeyRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {backgroundPatterns.map((pattern, index) => (
          <div
            key={index}
            className={`absolute w-16 h-16 border-2 ${
              index === 0 ? 'border-white' : index === 1 ? 'border-green-500' : 'border-red-500'
            } rounded-full ${
              index === 1 ? 'animate-ping' : 'animate-pulse'
            }`}
            style={{
              ...pattern,
              animationDelay: pattern.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-white to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Kenya&apos;s Economic Powerhouses
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the top 5 industries driving Kenya&apos;s $131.7 billion economy and fueling sustainable growth across East Africa.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Industries Section - Reduced width */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">Key GDP Contributors</h3>
            
            {industryEvents.map((industry, index) => (
              <motion.div
                key={industry.rank}
                initial={{ opacity: 0, x: -80 }}
                animate={isAnimated ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative ${activeEventIndex === index ? 'transform scale-105' : ''} transition-all duration-500`}
              >
                <Card className={`bg-gray-700/40 backdrop-blur-sm border-gray-600 hover:border-gray-500 transition-all duration-300 ${activeEventIndex === index ? 'ring-2 ring-white/50 shadow-xl' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${industry.color} rounded-full flex items-center justify-center flex-shrink-0 transform hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                        {industry.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <CardTitle className="text-lg font-bold text-white leading-tight">{industry.title}</CardTitle>
                          <span className="text-xs font-bold text-gray-300 bg-gray-600 px-2 py-1 rounded">{industry.rank}</span>
                        </div>
                        <span className="text-sm font-semibold text-green-400">{industry.gdpContribution} of GDP</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-300 leading-relaxed">{industry.description}</p>
                  </CardContent>
                </Card>
                
                {/* Timeline connector */}
                {index < industryEvents.length - 1 && (
                  <div className="absolute left-5 top-full w-0.5 h-6 bg-gradient-to-b from-gray-400 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Visualization Section - Increased width */}
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isAnimated ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Image Slider Section */}
            <Card className="bg-gradient-to-br from-blue-600/20 via-green-600/10 to-purple-600/20 p-8 rounded-3xl border border-gray-600 backdrop-blur-sm">
              <div className="relative mb-6 overflow-hidden rounded-lg group">
                {/* Image Container */}
                <div className="relative h-80 md:h-96">
                  {slideImages.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={1000}
                        height={800}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                      <motion.div 
                        className="absolute bottom-6 left-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={index === currentImageIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h4 className="text-xl md:text-2xl font-bold">{slide.title}</h4>
                        <p className="text-sm md:text-base opacity-90">{slide.subtitle}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slideImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {industryStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={`${stat.color} rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    whileHover={{ 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                      y: -4 
                    }}
                  >
                    <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Progress Section */}
              <div className="text-center">
                <h4 className="text-xl md:text-2xl font-bold mb-4">Economic Diversification Progress</h4>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={handleProgressClick}
                  className="cursor-pointer"
                >
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Vision 2030 Goals Achievement</span>
                    <span>72%</span>
                  </div>
                  <div className="relative bg-gray-700 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={isAnimated ? { width: '72%' } : {}}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </div>
                </motion.div>
              </div>
            </Card>

            {/* Call to Action */}
            <motion.div
              className="text-center p-6 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-xl border border-gray-600"
              initial={{ opacity: 0, y: 30 }}
              animate={isAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h4 className="text-lg md:text-xl font-bold mb-2">Be Part of the Growth</h4>
              <p className="text-gray-300 text-sm md:text-base">
                Kenya&apos;s diversified economy offers opportunities across all sectors - from tech innovation to sustainable agriculture.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tooltip */}
      {progressDetails && (
        <motion.div
          className="fixed bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 max-w-xs text-sm border border-gray-600 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            left: `${progressDetails.x + 10}px`,
            top: `${progressDetails.y + 10}px`,
          }}
        >
          {progressDetails.text}
        </motion.div>
      )}
    </section>
  );
}