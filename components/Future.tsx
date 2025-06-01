'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Future() {
  const futureRef = useRef<HTMLDivElement>(null);
  type ProgressDetails = { text: string; x: number; y: number } | null;
  const [progressDetails, setProgressDetails] = useState<ProgressDetails>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisible) {
            setHasBeenVisible(true);
            setTimeout(() => {
              setProgressWidth(75);
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (futureRef.current) {
      observer.observe(futureRef.current);
    }

    return () => observer.disconnect();
  }, [hasBeenVisible]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setProgressDetails({
      text: 'Vision 2030: 75% complete with Konza Technopolis leading smart city development.',
      x: e.clientX,
      y: e.clientY,
    });
    setTimeout(() => setProgressDetails(null), 3000);
  };

  const smartCities = [
    {
      title: 'Konza Technopolis',
      description:
        'Africa\'s premier smart city, integrating cutting-edge technology with sustainable urban planning. A 5,000-acre technology hub designed to house 200,000 residents and create 200,000 jobs by 2030.',
      icon: (
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      ),
      color: 'from-white to-gray-100',
    },
    {
      title: 'Innovation Ecosystem',
      description:
        'Fostering startups, tech companies, and research institutions. Home to fintech innovations, health tech solutions, and agricultural technology serving the continent.',
      icon: (
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      color: 'from-green-600 to-green-500',
    },
    {
      title: 'Digital Infrastructure',
      description:
        '5G networks, fiber optic connectivity, and IoT integration creating the backbone for smart governance, healthcare, education, and sustainable urban living.',
      icon: (
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      color: 'from-red-600 to-red-500',
    },
  ];

  const shouldAnimate = hasBeenVisible;

  return (
    <section 
      id="future" 
      className="py-20 relative overflow-hidden bg-gradient-to-br from-black via-green-800 to-red-600"
      ref={futureRef}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {/* Static titles without animation - always visible */}
          <h2
            className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-white via-80% to-green-700"
          >
            Building Tomorrow&#39;s Kenya
          </h2>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto">
            Leading Africa&#39;s smart city revolution with innovative technology hubs that will transform how we live, work, and connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Smart Cities Cards */}
          <div className="space-y-8">
            {smartCities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="transform transition-all duration-300"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${city.color} rounded-lg flex items-center justify-center mr-4 shadow-lg`}>
                      {city.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{city.title}</h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed">{city.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - City Visualization */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
              <div className="w-full h-64 mb-8 rounded-lg overflow-hidden">
                <img 
                  src="/images/konza-technopolis.webp" 
                  alt="Konza Technopolis - Africa's Smart City"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { height: 'h-16', color: 'bg-blue-500/40', delay: 0 },
                  { height: 'h-20', color: 'bg-green-500/40', delay: 100 },
                  { height: 'h-24', color: 'bg-purple-500/40', delay: 200 },
                  { height: 'h-28', color: 'bg-red-500/40', delay: 300 },
                  { height: 'h-32', color: 'bg-yellow-500/40', delay: 400 },
                  { height: 'h-36', color: 'bg-cyan-500/40', delay: 500 },
                ].map((block, index) => (
                  <motion.div
                    key={index}
                    className={`${block.height} ${block.color} rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={shouldAnimate ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                  />
                ))}
              </div>

              <div className="text-center">
                <h4 className="text-2xl font-bold mb-4 text-white">Vision 2030 Progress</h4>
                <div 
                  className="cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Smart Cities Development</span>
                    <span>{progressWidth}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 via-white to-red-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progressWidth}%` }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {progressDetails && (
        <motion.div
          className="fixed z-50 bg-white text-black p-3 rounded-lg shadow-lg max-w-xs text-sm pointer-events-none"
          style={{ 
            left: progressDetails.x + 10, 
            top: progressDetails.y - 60
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {progressDetails.text}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </motion.div>
      )}
    </section>
  );
}