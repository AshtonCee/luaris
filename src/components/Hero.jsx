import React, { useEffect, useRef } from 'react';
import ConstellationCanvas from './ConstellationCanvas';
import Button from './Button';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Trigger Entry Animations
    const timer = setTimeout(() => {
      if (containerRef.current) containerRef.current.classList.add('visible');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="hero-section" style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '60px',
      background: 'var(--bg-black)'
    }}>
      <ConstellationCanvas />

      <div className="container" ref={containerRef} style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '1400px', pointerEvents: 'none' }}>

        <div className="reveal-text delay-1">
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--accent-cyan)',
            marginBottom: '1.5rem',
            fontWeight: '600',
            textShadow: '0 0 10px rgba(0, 240, 255, 0.3)'
          }}>
            Future Ready
          </span>
        </div>

        <div className="reveal-text delay-2">
          <h1 className="hero-title">
            Architecting the<br />
            <span className="highlight-text">Future of Web Design</span>
          </h1>
        </div>

        <div className="reveal-text delay-3">
          <p className="hero-subtitle">
            We forge custom high-performance digital experiences for brands that refuse to blend in.
          </p>
        </div>

        <div className="reveal-text delay-4" style={{ pointerEvents: 'auto' }}>
          <Button href="#services" className="hero-cta">
            What We Do
          </Button>
        </div>
      </div>

      <style>{`
                .hero-title {
                    font-size: clamp(3.5rem, 8vw, 8.5rem);
                    font-weight: 700;
                    line-height: 1.05;
                    margin-bottom: 2rem;
                    letter-spacing: -0.04em;
                    color: #fff;
                }

                .highlight-text {
                    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    position: relative;
                    display: inline-block;
                }

                .hero-subtitle {
                    font-family: var(--font-body);
                    font-size: clamp(1.1rem, 2vw, 1.4rem);
                    max-width: 600px;
                    margin: 0 auto 4rem;
                    color: #888888;
                    font-weight: 300;
                    opacity: 1; /* Remove opacity to ensure exact color match */
                }

                /* Reveal Animations */
                .reveal-text {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .container.visible .reveal-text {
                    opacity: 1;
                    transform: translateY(0);
                }

                .delay-1 { transition-delay: 0.1s; }
                .delay-2 { transition-delay: 0.3s; }
                .delay-3 { transition-delay: 0.5s; }
                .delay-4 { transition-delay: 0.7s; }
            `}</style>
    </header>
  );
};

export default Hero;
