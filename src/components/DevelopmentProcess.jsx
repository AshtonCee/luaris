import React, { useEffect, useRef, useState } from 'react';

const steps = [
    {
        id: '01',
        title: 'DISCOVERY',
        description: 'We dive deep into your brand, goals, and audience to map out a strategic digital direction.'
    },
    {
        id: '02',
        title: 'WIREFRAME',
        description: 'Blueprint of the user experience. We structure the information architecture for intuitive flow.'
    },
    {
        id: '03',
        title: 'CODE',
        description: 'Clean, performant code. We build with modern frameworks to ensure speed, security, and scalability.'
    },
    {
        id: '04',
        title: 'QA',
        description: 'Rigorous testing. We squash bugs and optimize performance across all devices and browsers.'
    },
    {
        id: '05',
        title: 'LAUNCH',
        description: 'Lift-off. We handle the deployment and ensure a smooth transition to your new digital reality.'
    }
];

const DevelopmentProcess = () => {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.15 }
        );

        const elements = sectionRef.current.querySelectorAll('.animate-item');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="process"
            className="section"
            ref={sectionRef}
            style={{
                backgroundColor: 'var(--bg-black)',
                padding: '120px 0',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Circuit Overlay */}
            <div className="circuit-bg"></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="animate-item section-header">
                    <span className="section-label">03 — Process</span>
                    <h2 className="section-title heading-glow">Development Lifecycle</h2>
                </div>



                <div className="process-grid">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`process-step animate-item delay-${index}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="step-content">
                                <div className={`step-marker ${hoveredIndex >= index ? 'active' : ''}`}>
                                    <span className="step-number">{step.id}</span>
                                </div>
                                <h3 className={`step-title ${hoveredIndex === index ? 'active' : ''}`}>{step.title}</h3>
                                <p className="step-desc">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="process-track-container">
                    <div className="process-track"></div>
                    <div
                        className="process-progress"
                        style={{
                            width: hoveredIndex !== null && windowWidth > 900 ? `${(hoveredIndex / 4) * 100}%` : (windowWidth <= 900 ? '2px' : '0%'),
                            height: hoveredIndex !== null && windowWidth <= 900 ? `${(hoveredIndex / 4) * 100}%` : (windowWidth > 900 ? '100%' : '0%')
                        }}
                    ></div>
                </div>
            </div>

            <style>{`
                .section-header {
                    margin-bottom: 5rem;
                    text-align: left;
                }

                .section-label {
                    display: block;
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                    color: var(--accent-cyan);
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                }

                .section-title {
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    color: white;
                    text-transform: uppercase;
                }

                /* Track Container */
                .process-track-container {
                    position: relative;
                    margin-top: 3rem; /* Space below items */
                    left: 10%;
                    width: 80%;
                    height: 2px;
                    z-index: 0;
                }

                .process-track {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #222;
                }

                .process-progress {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo));
                    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
                }

                .process-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                    position: relative;
                    z-index: 1; /* Above track */
                }

                .process-step {
                    position: relative;
                    padding-top: 3rem;
                    /* Align markers to center of grid cell */
                    display: flex;
                    flex-direction: column;
                    align-items: center; /* Center content */
                    text-align: center;
                }

                /* Circuit Lines Connection */
                
                .step-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    align-items: center;
                    width: 100%;
                }

                .step-marker {
                    width: 30px;
                    height: 30px;
                    border: 2px solid #333;
                    background: var(--bg-black);
                    border-radius: 50%; /* Circuit nodes usually round or square */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 0;
                    /* Center horizontally in the relative parent (.process-step) */
                    left: 50%;
                    transform: translateX(-50%);
                    transition: all 0.4s ease;
                    z-index: 2; /* Hide line behind */
                }

                .step-marker.active {
                    border-color: var(--accent-cyan);
                    background: var(--accent-cyan);
                    box-shadow: 0 0 15px var(--accent-cyan);
                }

                .step-number {
                    font-size: 0.7rem;
                    font-family: var(--font-mono);
                    color: #666;
                }

                .step-title {
                    font-family: var(--font-display);
                    font-size: 1.5rem;
                    color: #fff;
                    margin: 0;
                    text-transform: uppercase;
                    transition: color 0.3s ease;
                }

                .step-title.active {
                    color: var(--accent-cyan);
                }

                .step-desc {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    max-width: 250px;
                }

                /* Mobile Response */
                @media (max-width: 900px) {
                    .process-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                        padding-left: 3rem; /* Space for line */
                        text-align: left;
                    }

                    .process-step {
                        padding-top: 0;
                        align-items: flex-start;
                        text-align: left;
                    }
                    
                    .step-content {
                        align-items: flex-start;
                    }

                    .step-marker {
                        left: -3rem; 
                        top: 0;
                        transform: none;
                    }
                    
                    .step-desc {
                        max-width: 100%;
                    }

                    /* Vertical Track */
                    .process-track-container {
                        top: 15px; /* Start at first dot center */
                        left: 15px;
                        
                        width: 2px;
                        height: 85%; 
                    }
                    
                    .process-progress {
                        width: 100%; /* Full width of the 2px line */
                        height: 0; /* Animate height */
                        transition: height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                    }
                }

                /* Animations */
                .animate-item {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .animate-item.in-view {
                    opacity: 1;
                    transform: translateY(0);
                }
                .delay-0 { transition-delay: 0.1s; }
                .delay-1 { transition-delay: 0.2s; }
                .delay-2 { transition-delay: 0.3s; }
                .delay-3 { transition-delay: 0.4s; }
                .delay-4 { transition-delay: 0.5s; }

            `}</style>
        </section>
    );
};

export default DevelopmentProcess;
