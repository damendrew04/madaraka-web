'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Define particle type
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0); // Use ref to generate unique IDs

  useEffect(() => {
    // Staggered text reveal
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('span');
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          delay: 0.5,
        }
      );
    }

    // Continuous background animation
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: 'none',
      });
    }

    // Continuous floating orbs animation
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll('.floating-orb');
      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          y: `${Math.sin(index) * 50}px`,
          x: `${Math.cos(index) * 30}px`,
          rotation: 360,
          duration: 8 + index * 2,
          repeat: -1,
          ease: 'sine.inOut',
          yoyo: true,
        });
        
        // Scale pulsing
        gsap.to(orb, {
          scale: 1.2,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }

    // Continuous title glow effect
    if (textRef.current) {
      gsap.to(textRef.current, {
        textShadow: '0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(21, 128, 61, 0.6), 0 0 60px rgba(0, 0, 0, 0.4)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Parallax effect on scroll
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelectorAll('.parallax-layer'), {
        y: (i) => (i + 1) * window.innerHeight * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Continuous particle generation (ambient particles)
    const ambientParticles = setInterval(() => {
      const newParticle: Particle = {
        id: ++particleIdRef.current,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: ['kenya-red', 'kenya-green', 'kenya-black'][Math.floor(Math.random() * 3)],
      };
      setParticles((prev) => [...prev, newParticle].slice(-20)); // Increased to 20 particles
    }, 2000);

    // Mouse-following particles
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: Particle = {
        id: ++particleIdRef.current, // Generate unique incremental ID
        x: e.clientX,
        y: e.clientY,
        color: ['kenya-red', 'kenya-green', 'kenya-black'][Math.floor(Math.random() * 3)],
      };
      setParticles((prev) => [...prev, newParticle].slice(-25)); // Increased limit
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(ambientParticles);
    };
  }, []);

  // Title click effect
  const handleTitleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const ripple = document.createElement('div');
    ripple.className = `absolute w-20 h-20 bg-kenya-green/50 rounded-full animate-ripple`;
    ripple.style.left = `${e.clientX - 40}px`;
    ripple.style.top = `${e.clientY - 40}px`;
    document.body.appendChild(ripple);
    gsap.to(ripple, {
      scale: 3,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  };

  const titleText = 'MADARAKA DAY';
  const chars = titleText.split('');

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      ref={heroRef}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(21, 128, 61, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(30, 64, 175, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(17, 24, 39, 0.95) 50%, rgba(0, 0, 0, 0.9) 100%)
        `
      }}
    >
      {/* Animated Background Geometric Shapes */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              transparent 0deg, 
              rgba(220, 38, 38, 0.1) 60deg, 
              transparent 120deg, 
              rgba(21, 128, 61, 0.1) 180deg, 
              transparent 240deg, 
              rgba(30, 64, 175, 0.1) 300deg, 
              transparent 360deg)
          `
        }}
      />

      {/* Floating Orbs */}
      <div ref={orbsRef} className="absolute inset-0">
        <div className="floating-orb absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-transparent blur-sm" />
        <div className="floating-orb absolute top-1/3 right-1/5 w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-transparent blur-sm" />
        <div className="floating-orb absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/15 to-transparent blur-sm" />
        <div className="floating-orb absolute top-2/3 right-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-red-400/25 to-transparent blur-sm" />
        <div className="floating-orb absolute bottom-1/3 right-1/6 w-28 h-28 rounded-full bg-gradient-to-br from-green-400/20 to-transparent blur-sm" />
      </div>

      <div className="custom-cursor" ref={cursorRef} />
      
      {/* Enhanced Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-4 h-4 rounded-full animate-pulse shadow-lg ${
            particle.color === 'kenya-red'
              ? 'bg-gradient-to-r from-red-500 to-red-700 shadow-red-500/50'
              : particle.color === 'kenya-green'
              ? 'bg-gradient-to-r from-green-500 to-green-700 shadow-green-500/50'
              : 'bg-gradient-to-r from-gray-700 to-black shadow-gray-500/50'
          }`}
          style={{ 
            left: particle.x - 2, 
            top: particle.y - 2,
            animation: 'float 4s ease-in-out infinite, fadeInOut 3s ease-in-out infinite'
          }}
        />
      ))}
      
      {/* Enhanced Parallax Elements */}
      <div className="absolute inset-0 parallax-layer">
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-green-500 to-green-700 rounded-full animate-pulse delay-500 shadow-lg shadow-green-500/50" />
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-900 rounded-full animate-pulse delay-1000 shadow-lg shadow-blue-500/50" />
        <div className="absolute top-1/2 left-1/12 w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse delay-700 shadow-lg shadow-yellow-500/50" />
        <div className="absolute bottom-1/3 right-1/12 w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full animate-pulse delay-300 shadow-lg shadow-purple-500/50" />
      </div>
      
      <div className="text-center z-10 max-w-6xl mx-auto px-6 hero-content">
        {/* Enhanced Kenyan Flag */}
        <div className="mb-8 relative mx-auto w-24 h-16 md:w-32 md:h-20 transform hover:scale-110 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-green-500/20 to-blue-500/20 rounded-lg blur-md animate-pulse" />
          <Image
            src="/images/kenya-flag.gif"
            alt="Kenyan Flag"
            fill
            className="object-contain animate-pulse relative z-10 shadow-2xl"
            priority
          />
        </div>

        <h1
          className="text-4xl md:text-7xl font-black mb-6 leading-tight cursor-pointer transform hover:scale-105 transition-all duration-300"
          onClick={handleTitleClick}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5)) drop-shadow(0 0 20px rgba(21, 128, 61, 0.3))'
          }}
        >
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
            CELEBRATING
          </span>
          <span
            className="block bg-gradient-to-r from-red-500 via-green-500 to-blue-600 bg-clip-text text-transparent"
            ref={textRef}
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradientShift 4s ease-in-out infinite'
            }}
          >
            {chars.map((char, index) => (
              <span 
                key={index} 
                className="inline-block hover:animate-bounce"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  textShadow: '0 0 10px currentColor'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-pulse">
          <span className="bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent">
            62 Years of Independence • Building Tomorrow&apos;s Kenya • Smart Cities Revolution
          </span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button
            className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 px-12 py-6 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            style={{
              backgroundSize: '300% 300%',
              animation: 'gradientShift 3s ease-in-out infinite',
              boxShadow: '0 0 30px rgba(220, 38, 38, 0.3), 0 0 40px rgba(21, 128, 61, 0.2)'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.1, rotate: 5, duration: 0.3 });
              gsap.to(cursorRef.current, { scale: 1.5, background: 'radial-gradient(circle, rgba(29, 78, 216, 0.7), transparent)' });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.3 });
              gsap.to(cursorRef.current, { scale: 1, background: 'radial-gradient(circle, rgba(5, 150, 105, 0.5), transparent)' });
            }}
          >
            <span className="relative z-10">Explore Our Journey</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </Button>
          
          <Button
            variant="link"
            className="text-green-400 hover:text-green-300 flex items-center gap-2 text-lg relative group"
            onClick={() => {
              gsap.to('.hero-content', {
                scale: 1.05,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
              });
            }}
            onMouseEnter={() => {
              gsap.to(cursorRef.current, { scale: 1.5, background: 'radial-gradient(circle, rgba(29, 78, 216, 0.7), transparent)' });
            }}
            onMouseLeave={() => {
              gsap.to(cursorRef.current, { scale: 1, background: 'radial-gradient(circle, rgba(5, 150, 105, 0.5), transparent)' });
            }}
          >
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Watch Vision 2030
            </span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Enhanced Floating Geometric Elements */}
      <div className="absolute top-1/4 right-1/4 animate-float parallax-layer">
        <div className="w-16 h-16 border-2 border-green-500 rounded-lg rotate-45 opacity-40 shadow-lg shadow-green-500/30"
             style={{ animation: 'float 6s ease-in-out infinite, rotate 12s linear infinite' }} />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float delay-2000 parallax-layer">
        <div className="w-12 h-12 border-2 border-blue-500 rounded-full opacity-40 shadow-lg shadow-blue-500/30"
             style={{ animation: 'float 8s ease-in-out infinite reverse, pulse 4s ease-in-out infinite' }} />
      </div>
      <div className="absolute top-1/3 left-1/5 animate-float delay-1000 parallax-layer">
        <div className="w-8 h-8 border-2 border-red-500 rounded-full opacity-40 shadow-lg shadow-red-500/30"
             style={{ animation: 'float 10s ease-in-out infinite, rotate 8s linear infinite reverse' }} />
      </div>
      
      {/* Add custom CSS for additional animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(5, 150, 105, 0.5), transparent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
        }
      `}</style>
    </section>
  );
}