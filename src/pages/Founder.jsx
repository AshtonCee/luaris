import React, { useEffect } from 'react';
import Contact from '../components/Contact'; // Reuse Footer

const techStack = [
    { name: 'React', icon: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' },
    { name: 'UI/UX Design', icon: 'M12 2C8 2 4 8 4 14C4 20 12 22 12 22C12 22 20 20 20 14C20 8 16 2 12 2Z' },
    { name: 'AI/ML Integration', icon: 'M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17' },
    { name: 'Product Strategy', icon: 'M12 2L2 22h20L12 2zm0 3.5L18.5 20H5.5L12 5.5z' }, // Triangle strategy
    { name: 'Brand Identity', icon: 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z' }, // Circle core
    { name: 'Digital Products', icon: 'M5 7h14l-2 10H7L5 7z' }, // Bag
    { name: 'Automation', icon: 'M12 2v20M2 12h20' }, // Cross/System
    { name: 'Analytics', icon: 'M3 21h18v-2H3v2zm0-4h4v-4H3v4zm6 0h4v-8H9v8zm6 0h4v-6h-4v6z' } // Bar chart
];

const Founder = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="founder-page" style={{ paddingTop: '80px', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
            <div className="container">

                {/* Hero Header */}
                <div className="founder-hero animate-in">
                    <h1 className="hero-title">Architecting the Future.</h1>
                    <p className="hero-subtext">
                        Bridging the gap between raw code and human experience to build digital products that matter.
                    </p>
                </div>

                {/* Founder Profile */}
                <div className="founder-layout">

                    {/* Left: Portrait (Placeholder) */}
                    <div className="founder-image-wrapper animate-in delay-1">
                        <img
                            src="/founder.jpg"
                            alt="The Founder"
                            className="founder-image"
                        />
                    </div>

                    {/* Right: Bio */}
                    <div className="founder-content animate-in delay-2">
                        <h2 className="section-label">The Founder</h2>
                        <div className="bio-text">
                            <p>
                                As a web developer and full-time student at the University of Kansas, I live at the intersection of learning and doing. My background includes hands-on development experience at Advisors Excel, where I learned the importance of balancing clean code with real business impact.
                            </p>
                            <p>
                                What sets me apart isn't just the code I write, but the relentless drive to create something exceptional. I am constantly pushing to architect better solutions, ensuring that every project I touch is built with precision, passion, and a focus on the future.
                            </p>
                        </div>

                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/ashton-coplin/" target="_blank" rel="noopener noreferrer" className="social-btn">
                                LinkedIn
                            </a>
                            <a href="https://github.com/AshtonCee" target="_blank" rel="noopener noreferrer" className="social-btn">
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="skills-section animate-in delay-3">
                    <h3 className="section-label center">The Tech Stack</h3>
                    <div className="skills-grid">
                        {techStack.map((tech, i) => (
                            <div key={i} className="skill-card">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" className="skill-icon">
                                    <path d={tech.icon} />
                                </svg>
                                <span className="skill-name">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Reuse Contact Footer */}
            <div className="founder-cta-section animate-in delay-4">
                <Contact />
            </div>

            <style>{`
                .founder-page {
                    opacity: 0;
                    animation: fadeInPage 1s ease forwards;
                }
                @keyframes fadeInPage {
                    to { opacity: 1; }
                }

                .founder-hero {
                    text-align: center;
                    padding: 80px 0 100px;
                }

                .hero-title {
                    font-size: clamp(3rem, 7vw, 6rem);
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    line-height: 1.1;
                }

                .hero-subtext {
                    font-size: 1.25rem;
                    color: #aaa;
                    max-width: 600px;
                    margin: 0 auto;
                    font-weight: 300;
                }

                .founder-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                    margin-bottom: 150px;
                    align-items: center;
                }
                @media (min-width: 992px) {
                    .founder-layout {
                        grid-template-columns: 400px 1fr; /* Reduced image column size */
                        gap: 8rem;
                    }
                }

                .founder-image-wrapper {
                    width: 385px;
                    height: 385px;
                    position: relative;
                    margin: 0 auto;
                }

                .founder-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border: 1px solid #333;
                    filter: grayscale(100%);
                    transition: all 0.5s ease;
                }
                
                .founder-image:hover {
                    filter: grayscale(0%);
                    border-color: var(--accent-cyan);
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
                }

                .section-label {
                    font-family: var(--font-display);
                    font-size: 0.9rem;
                    color: var(--accent-cyan);
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    margin-bottom: 2rem;
                    display: block;
                }
                .section-label.center { text-align: center; }

                .bio-text p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #d4d4d4;
                    margin-bottom: 2rem;
                }

                .social-links {
                    display: flex;
                    gap: 1.5rem;
                }

                .social-btn {
                    padding: 0.8rem 2rem;
                    border: 1px solid #333;
                    color: #fff;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 0.85rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .social-btn:hover {
                    border-color: var(--accent-cyan);
                    color: var(--accent-cyan);
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
                }

                .skills-section {
                    margin-bottom: 150px;
                }

                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                }
                @media (min-width: 768px) {
                    .skills-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }

                .skill-card {
                    background: #111;
                    border: 1px solid #222;
                    padding: 3rem 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    transition: all 0.3s ease;
                }
                .skill-card:hover {
                    border-color: var(--accent-cyan);
                    background: #0f0f0f;
                    transform: translateY(-5px);
                }

                .skill-icon {
                    color: #555;
                    transition: color 0.3s ease;
                }
                .skill-card:hover .skill-icon {
                    color: var(--accent-cyan);
                }

                .skill-name {
                    font-family: var(--font-display);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #888;
                }
                .skill-card:hover .skill-name {
                    color: #fff;
                }

                /* Staggered Animations */
                .animate-in {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .delay-1 { animation-delay: 0.2s; }
                .delay-2 { animation-delay: 0.4s; }
                .delay-3 { animation-delay: 0.6s; }
                
                @keyframes fadeInUp {
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Founder;
