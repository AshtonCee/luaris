import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ConstellationCanvas from '../components/ConstellationCanvas';

const NotFound = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Simple entry animation
        const timer = setTimeout(() => {
            if (containerRef.current) containerRef.current.classList.add('visible');
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="not-found-section">
            <ConstellationCanvas />

            <div className="content-container" ref={containerRef}>
                <h1 className="error-code">404</h1>
                <h2 className="error-message">Page Not Found</h2>
                <p className="error-description">
                    The coordinates you are looking for do not exist in this system.
                </p>

                <Link to="/" className="home-btn">
                    Return to Base
                </Link>
            </div>

            <style>{`
                .not-found-section {
                    min-height: 100vh;
                    width: 100%;
                    background-color: var(--bg-black);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                    padding: 2rem;
                }

                .content-container {
                    position: relative;
                    z-index: 10;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s ease;
                }

                .content-container.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .error-code {
                    font-family: var(--font-display);
                    font-size: clamp(6rem, 15vw, 12rem);
                    line-height: 1;
                    margin: 0;
                    font-weight: 700;
                    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    /* Glow effect matching heading-glow but simpler for text */
                    filter: drop-shadow(0 0 20px rgba(84, 0, 255, 0.4));
                }

                .error-message {
                    font-family: var(--font-display);
                    font-size: clamp(1.5rem, 4vw, 2.5rem);
                    color: #fff;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .error-description {
                    font-family: var(--font-mono);
                    color: #888888;
                    font-size: 1rem;
                    max-width: 400px;
                    margin: 0 auto 3rem;
                    line-height: 1.6;
                }

                .home-btn {
                    display: inline-block;
                    padding: 1rem 3rem;
                    background: transparent;
                    border: 1px solid var(--accent-cyan);
                    color: var(--accent-cyan);
                    font-family: var(--font-mono);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .home-btn:hover {
                    background: var(--accent-cyan);
                    color: #000;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
                }
            `}</style>
        </main>
    );
};

export default NotFound;
