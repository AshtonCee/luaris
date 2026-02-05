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
                            <div className={`step-connector ${index > 0 ? 'has-line' : ''} ${hoveredIndex >= index ? 'active' : ''}`}></div>

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

                .process-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                    position: relative;
                }

                .process-step {
                    position: relative;
                    padding-top: 3rem;
                }

                /* Circuit Lines Connection */
                .step-connector {
                    position: absolute;
                    top: 15px; /* Align with circle center roughly */
                    left: -50%;
                    width: 100%;
                    height: 2px;
                    background: #222;
                    transition: all 0.5s ease;
                }
                
                .process-step:first-child .step-connector {
                    display: none;
                }

                .step-connector.active {
                    background: var(--accent-cyan);
                    box-shadow: 0 0 8px var(--accent-cyan);
                }

                .step-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .step-marker {
                    width: 30px;
                    height: 30px;
                    border: 2px solid #333;
                    background: 'var(--bg-black)',
                    border-radius: 50%; /* Circuit nodes usually round or square */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transition: all 0.4s ease;
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
                    opacity: 0; /* Hide number inside dot for cleaner circuit look, or keep it */
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
                }

                /* Mobile Response */
                @media (max-width: 900px) {
                    .process-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                        padding-left: 2rem; /* Make room for vertical line */
                    }

                    .process-step {
                        padding-top: 0;
                        padding-left: 2rem;
                    }

                    .step-marker {
                        left: -3rem; /* Align to left vertical line */
                        top: 0;
                        z-index: 2;
                    }

                    /* Vertical Line */
                    .step-connector {
                        top: -3rem; /* Connect from previous */
                        left: -2.1rem; /* Align vertical - approx center of marker */
                        width: 2px;
                        height: calc(100% + 3rem); /* Stretch full height to next */
                    }
                    
                    .process-step:first-child .step-connector {
                        display: none; 
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
