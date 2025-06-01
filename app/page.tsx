'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Journey from '../components/Journey';
import Timeline from '../components/Timeline';
import Future from '../components/Future';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.from('body', { duration: 0.5, opacity: 0, ease: 'power2.out' });

    // Click-based ripple effect
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'absolute w-10 h-10 bg-kenya-green/50 rounded-full animate-ripple';
      ripple.style.left = `${e.clientX - 20}px`;
      ripple.style.top = `${e.clientY - 20}px`;
      document.body.appendChild(ripple);
      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });
    });

    // Scroll-based storytelling
    gsap.utils.toArray(['#journey', '#milestones', '#future']).forEach((section) => {
      const el = section as Element;
      gsap.from(el.querySelectorAll('h2, p, .journey-card, .milestone-item > div, .smart-city-card'), {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Konami code for special animation
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          gsap.to('.bg-gradient-to-r', {
            rotation: 360,
            scale: 1.2,
            duration: 2,
            ease: 'elastic.out(1, 0.3)',
            yoyo: true,
            repeat: 1,
          });
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });

    // Pause animations outside viewport
    const pauseAnimations = () => {
      const elements = Array.from(document.querySelectorAll('.animate-float, .animate-pulse, .animate-wave'));
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        const tweens = gsap.getTweensOf(element);
        tweens.forEach((anim) => {
          if (isVisible) {
            anim.play();
          } else {
            anim.pause();
          }
        });
      });
    };

    window.addEventListener('scroll', pauseAnimations);
    window.addEventListener('resize', pauseAnimations);
    return () => {
      window.removeEventListener('scroll', pauseAnimations);
      window.removeEventListener('resize', pauseAnimations);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Journey />
      <Timeline />
      <Future />
      <Footer />
    </>
  );
}