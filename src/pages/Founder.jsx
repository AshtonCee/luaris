import React, { useEffect } from 'react';
import Contact from '../components/Contact'; // Reuse Footer
import Button from '../components/Button';

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
        <div className="founder-page" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container">

                {/* Hero Header */}
                <div className="founder-hero animate-in">
                    <span className="section-label center">Visionary</span>
                    <h1 className="hero-title">
                        Architecting the <span className="highlight-text">Future.</span>
                    </h1>
                    <p className="hero-subtext">
                        Bridging the gap between raw code and human experience to build digital products that matter.
                    </p>
                </div>

                {/* Founder Profile */}
                <div className="founder-layout">

                    {/* Left: Portrait */}
                    <div className="founder-image-wrapper animate-in delay-1">
                        <img
                            src="/founder.jpg"
                            alt="The Founder"
                            className="founder-image"
                        />
                        <div className="image-overlay"></div>
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
                            <Button href="https://www.linkedin.com/in/ashton-coplin/" target="_blank" rel="noopener noreferrer" className="social-btn">
                                LinkedIn
                            </Button>
                            <Button href="https://github.com/AshtonCee" target="_blank" rel="noopener noreferrer" className="social-btn">
                                GitHub
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="skills-section animate-in delay-3">
                    <h3 className="section-label center">The Tech Stack</h3>
                    <div className="skills-grid">
                        {techStack.map((tech, i) => (
                            <div key={i} className="skill-card">
                                <div className="card-top-line"></div>
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" className="skill-icon">
                                    <path d={tech.icon} />
                                </svg>
                                <span className="skill-name">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Reuse Contact Footer - Wrapper provides spacing */}
            <div className="founder-cta-section animate-in delay-4">
                <Contact />
            </div>

            <style>{`
                /* Page Transition */
                .founder-page {
                    opacity: 0;
                    animation: fadeInPage 1s ease forwards;
                    /* Removed hardcoded bg-color to allow global grid */
                }
                @keyframes fadeInPage {
                    to { opacity: 1; }
                }

                .founder-hero {
                    text-align: center;
                    padding: 0 0 100px;
                }

                .hero-title {
                    font-size: clamp(3.5rem, 8vw, 7rem);
                    font-weight: 700;
                    margin-bottom: 2rem;
                    line-height: 1.05;
                    letter-spacing: -0.04em;
                    color: #fff;
                }

                .highlight-text {
                    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-subtext {
                    font-size: clamp(1.1rem, 2vw, 1.4rem);
                    color: #888888;
                    max-width: 700px;
                    margin: 0 auto;
                    font-weight: 300;
                    line-height: 1.6;
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
                        grid-template-columns: 450px 1fr;
                        gap: 8rem;
                    }
                }

                /* Image Styling */
                .founder-image-wrapper {
                    width: 100%;
                    max-width: 450px;
                    aspect-ratio: 1;
                    position: relative;
                    margin: 0 auto;
                }

                .founder-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%);
                    transition: all 0.5s ease;
                    border: 1px solid #222;
                }
                
                /* Removed secondary outline ::after styles */

                .founder-image-wrapper:hover .founder-image {
                    filter: grayscale(0%);
                    border-width: 2px;
                    border-style: solid;
                    border-image: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo)) 1;
                }

                .section-label {
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                    color: var(--accent-cyan);
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    margin-bottom: 1.5rem;
                    display: block;
                }
                .section-label.center { text-align: center; }

                .bio-text p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #b0b0b0;
                    margin-bottom: 2rem;
                }

                .social-links {
                    display: flex;
                    gap: 1.5rem;
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

                /* Tech Card - Glassmorphism */
                .skill-card {
                    background: rgba(15, 15, 15, 0.6);
                    backdrop-filter: blur(5px);
                    border: 1px solid #1a1a1a;
                    padding: 3rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .card-top-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo));
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.4s ease;
                }

                .skill-card:hover {
                    transform: translateY(-5px);
                    border-color: #333;
                    background: #141414;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                
                .skill-card:hover .card-top-line {
                    transform: scaleX(1);
                }

                .skill-icon {
                    color: #444;
                    transition: color 0.3s ease;
                }
                .skill-card:hover .skill-icon {
                    color: var(--accent-cyan);
                    filter: drop-shadow(0 0 5px var(--accent-cyan));
                }

                .skill-name {
                    font-family: var(--font-display);
                    font-size: 0.95rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #666;
                    transition: color 0.3s ease;
                }
                .skill-card:hover .skill-name {
                    color: #fff;
                }

                /* Staggered Animations */
                .animate-in {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.2s; }
                .delay-3 { animation-delay: 0.3s; }
                .delay-4 { animation-delay: 0.4s; }
                
                @keyframes fadeInUp {
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Founder;
