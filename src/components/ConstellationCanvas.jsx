import React, { useEffect, useRef } from 'react';

const ConstellationCanvas = () => {
    const canvasRef = useRef(null);

    // Configuration
    const PARTICLE_COUNT = 80;
    const CONNECT_DISTANCE = 150;
    const ACCENT_COLOR_RGB = '0, 240, 255'; // Electric Cyan
    const ACCENT_SECONDARY_RGB = '84, 0, 255'; // Electric Indigo

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
                // Randomly assign primary or secondary color
                this.isSecondary = Math.random() > 0.7; // 30% Indigo
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off horizontal edges
                if (this.x < 0 || this.x > width) this.vx *= -1;

                // Wrap vertical edges for seamless bleed
                // This prevents the "hard wall" bounce at the bottom
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -50;

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

            draw(globalAlpha) {
                ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * globalAlpha})`;
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

            // Calculate global opacity based on scroll
            // Fade out completely after 1.5 viewports (Hero + half of Services)
            const maxScroll = window.innerHeight * 1.5;
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - (scrollY / maxScroll));

            if (opacity > 0) {
                // Update and Draw Particles
                particles.forEach(p => {
                    p.update();
                    p.draw(opacity);
                });

                // Draw Connections
                particles.forEach((a, index) => {
                    for (let j = index + 1; j < particles.length; j++) {
                        const b = particles[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < CONNECT_DISTANCE) {
                            const lineOpacity = (1 - (distance / CONNECT_DISTANCE)) * opacity;
                            // Mix colors if connecting different types, or match type
                            const color = a.isSecondary || b.isSecondary ? ACCENT_SECONDARY_RGB : ACCENT_COLOR_RGB;

                            ctx.strokeStyle = `rgba(${color}, ${lineOpacity * 0.5})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                });
            }

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

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0, // Behind content
                pointerEvents: 'none'
            }}
        />
    );
};

export default ConstellationCanvas;
