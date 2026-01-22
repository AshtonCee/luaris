import React, { useEffect, useRef, useState } from 'react';

const philosophies = [
    {
        id: '01',
        title: 'IMPACT',
        description: "We don't just build websites; we build engines for ROI. Every detail is engineered to drive measurable growth and business value."
    },
    {
        id: '02',
        title: 'CRAFT',
        description: "Mastery is in the details. We obsess over milliseconds of load time to ensure instant, fluid interactions."
    },
    {
        id: '03',
        title: 'PRECISION',
        description: "Chaos is the enemy of Scalability. We utilize rigorous design systems to ensure your digital ecosystem grows effortlessly with your business."
    }
];

const Approach = () => {
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
            { threshold: 0.2 }
        );

        const elements = sectionRef.current.querySelectorAll('.animate-item');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="approach"
            className="section"
            ref={sectionRef}
            style={{
                backgroundColor: '#050505',
                padding: '120px 0',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <div className="container">
                <div className="animate-item section-header">
                    <span className="section-label">02 — Philosophy</span>
                </div>

                <div className="philosophy-list">
                    {philosophies.map((item, index) => (
                        <div
                            key={item.id}
                            className={`philosophy-item animate-item delay-${index + 1}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                        >
                            <div className="item-header">
                                <span className={`item-number ${hoveredIndex === index ? 'active' : ''}`}>
                                    {item.id}
                                </span>
                                <h2 className={`item-title ${hoveredIndex === index ? 'active' : ''}`}>
                                    {item.title}
                                </h2>
                            </div>

                            <div className={`item-body ${hoveredIndex === index ? 'open' : ''}`}>
                                <div className="body-inner">
                                    <p>{item.description}</p>
                                </div>
                            </div>

                            <div className={`item-line ${hoveredIndex === index ? 'active' : ''}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .section-header {
                    margin-bottom: 2rem;
                }

                .section-label {
                    display: block;
                    font-family: var(--font-display);
                    font-size: 0.85rem;
                    color: var(--accent-cyan);
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                }

                .philosophy-list {
                    display: flex;
                    flex-direction: column;
                }

                .philosophy-item {
                    position: relative;
                    padding: 2rem 0;
                    cursor: default;
                }

                .item-header {
                    display: flex;
                    align-items: baseline;
                    gap: 2rem;
                    cursor: pointer;
                }

                .item-number {
                    font-family: 'Space Mono', monospace;
                    font-size: 1.2rem;
                    color: #444;
                    transition: color 0.4s ease;
                }
                .item-number.active {
                    color: var(--accent-cyan);
                }

                .item-title {
                    font-size: clamp(2rem, 5vw, 4rem);
                    font-weight: 700;
                    color: #fff;
                    margin: 0;
                    line-height: 0.9;
                    letter-spacing: -0.02em;
                    transition: color 0.4s ease, transform 0.4s ease;
                    /* Transparent stroke effect option */
                    /* -webkit-text-stroke: 1px rgba(255,255,255,0.2); 
                       color: transparent; */
                }
                .item-title.active {
                    color: var(--accent-cyan);
                    transform: translateX(20px);
                }

                .item-body {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .item-body.open {
                    max-height: 200px; /* Adjust based on content */
                }

                .body-inner {
                    padding-top: 1.5rem;
                    padding-left: calc(2rem + 1.2rem); /* Align with title */
                    padding-right: 2rem;
                    max-width: 800px;
                }

                .body-inner p {
                    font-size: 1.25rem;
                    color: #ccc;
                    line-height: 1.6;
                    font-weight: 300;
                }

                .item-line {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: #222;
                    transition: background 0.4s ease;
                }
                .item-line.active {
                    background: var(--accent-cyan);
                    box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
                }

                /* Mobile Adjustments */
                @media (max-width: 768px) {
                    .item-title {
                        font-size: 2.8rem;
                    }
                    .item-title.active {
                        transform: translateX(10px);
                    }
                    .body-inner {
                        padding-left: 0;
                    }
                }

                /* Animations */
                .animate-item {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .animate-item.in-view {
                    opacity: 1;
                    transform: translateY(0);
                }
                .delay-1 { transition-delay: 0.1s; }
                .delay-2 { transition-delay: 0.2s; }
                .delay-3 { transition-delay: 0.3s; }
            `}</style>
        </section>
    );
};

export default Approach;
