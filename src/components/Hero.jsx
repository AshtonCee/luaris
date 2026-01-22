import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Configuration
  const PARTICLE_COUNT = 80;
  const CONNECT_DISTANCE = 150;
  const ACCENT_COLOR_RGB = '0, 240, 255'; // Electric Cyan

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse Repel (Subtle)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (200 - distance) / 200;
          const directionX = forceDirectionX * force * 0.5;
          const directionY = forceDirectionY * force * 0.5;
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and Draw Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw Connections
      particles.forEach((a, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECT_DISTANCE) {
            const opacity = 1 - (distance / CONNECT_DISTANCE);
            ctx.strokeStyle = `rgba(${ACCENT_COLOR_RGB}, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    // Trigger Entry Animations
    const timer = setTimeout(() => {
      if (containerRef.current) containerRef.current.classList.add('visible');
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
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
      background: '#050505'
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />

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
          <a href="#services" className="hero-cta">
            What We Do
          </a>
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
                    color: var(--accent-cyan);
                    position: relative;
                    display: inline-block;
                }

                .hero-subtitle {
                    font-family: var(--font-body);
                    font-size: clamp(1.1rem, 2vw, 1.4rem);
                    max-width: 600px;
                    margin: 0 auto 4rem;
                    color: var(--text-off-white);
                    font-weight: 300;
                    opacity: 0.8;
                }

                .hero-cta {
                    position: relative;
                    display: inline-block;
                    padding: 1rem 3rem;
                    color: var(--accent-cyan);
                    text-transform: uppercase;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 0.9rem;
                    letter-spacing: 0.1em;
                    border: 1px solid var(--accent-cyan);
                    transition: all 0.3s ease;
                    overflow: hidden;
                    background: rgba(0,0,0,0.3);
                    backdrop-filter: blur(5px);
                }

                .hero-cta::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--accent-cyan);
                    transform: translateX(-101%);
                    transition: transform 0.3s ease;
                    z-index: -1;
                }

                .hero-cta:hover {
                    color: #000;
                }

                .hero-cta:hover::before {
                    transform: translateX(0);
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
