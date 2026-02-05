import React, { useEffect, useRef, useState } from 'react';

const philosophies = [
    {
        id: '01',
        title: 'IMPACT',
        description: "We engineer for performance. Our sites consistently achieve 100/100 Lighthouse scores through Core Web Vitals optimization and an SEO-first architecture that dominates search rankings."
    },
    {
        id: '02',
        title: 'CRAFT',
        description: "No templates, no bloat. We hand-code every pixel to ensure absolute control over the experience, delivering bespoke digital products that off-the-shelf solutions can't match."
    },
    {
        id: '03',
        title: 'PRECISION',
        description: "Built for scale. We utilize rigorous component-based design systems, type-safe code, and scalable CMS architectures to ensure your digital ecosystem grows robustly with your business."
    }
];

const Approach = () => {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Animation States
    const [counts, setCounts] = useState({ impact: 0 });
    const [typedCode, setTypedCode] = useState('');
    const fullCodeSnippet = '<Craft mode="hand-coded" />';

    // Precision State
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [locked, setLocked] = useState(false);

    const intervalRef = useRef(null);
    const typingRef = useRef(null);
    const scrambleRef = useRef(null);

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

    // Handle Animations on Hover
    useEffect(() => {
        // Clear all intervals
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (typingRef.current) clearInterval(typingRef.current);
        if (scrambleRef.current) clearInterval(scrambleRef.current);

        if (hoveredIndex === 0) { // IMPACT - Ticking Number
            let current = 0;
            intervalRef.current = setInterval(() => {
                current += 2;
                if (current >= 100) {
                    current = 100;
                    clearInterval(intervalRef.current);
                }
                setCounts(prev => ({ ...prev, impact: current }));
            }, 20);
        } else if (hoveredIndex === 1) { // CRAFT - Typing Code
            let charIndex = 0;
            setTypedCode(''); // Reset
            typingRef.current = setInterval(() => {
                if (charIndex < fullCodeSnippet.length) {
                    setTypedCode(fullCodeSnippet.substring(0, charIndex + 1));
                    charIndex++;
                } else {
                    clearInterval(typingRef.current);
                }
            }, 50);
        } else if (hoveredIndex === 2) { // PRECISION - Target Locking
            setLocked(false);
            let steps = 0;
            scrambleRef.current = setInterval(() => {
                steps++;
                // Randomize coordinates
                setCoordinates({
                    x: (Math.random() * 100).toFixed(2),
                    y: (Math.random() * 100).toFixed(2)
                });

                // Lock after ~600ms (30 steps * 20ms)
                if (steps > 30) {
                    clearInterval(scrambleRef.current);
                    setCoordinates({ x: '0.00', y: '0.00' });
                    setLocked(true);
                }
            }, 20);
        } else {
            // Reset states when leaving
            setCounts({ impact: 0 });
            setTypedCode('');
            setLocked(false);
            setCoordinates({ x: 0, y: 0 });
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (typingRef.current) clearInterval(typingRef.current);
            if (scrambleRef.current) clearInterval(scrambleRef.current);
        };
    }, [hoveredIndex]);

    return (
        <section
            id="approach"
            className="section"
            ref={sectionRef}
            style={{
                backgroundColor: 'var(--bg-black)',
                padding: '120px 0',
            }}
        >
            <div className="container">
                <div className="animate-item section-header">
                    <span className="section-label">02 — Our Methodology</span>
                    <h2 className="section-title heading-glow">The Approach</h2>
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
                            {/* Visual Overlays based on Index */}
                            {index === 0 && ( /* IMPACT */
                                <div className={`visual-overlay impact-overlay ${hoveredIndex === 0 ? 'active' : ''}`}>
                                    <div className="score-display">
                                        <span className="score-val">{counts.impact}</span>
                                        <span className="score-label">Lighthouse Score</span>
                                    </div>
                                </div>
                            )}

                            {index === 1 && ( /* CRAFT */
                                <div className={`visual-overlay craft-overlay ${hoveredIndex === 1 ? 'active' : ''}`}>
                                    <div className="code-display">
                                        <span className="code-text">{typedCode}</span>
                                        <span className="cursor">|</span>
                                    </div>
                                </div>
                            )}

                            {index === 2 && ( /* PRECISION */
                                <div className={`visual-overlay precision-overlay ${hoveredIndex === 2 ? 'active' : ''}`}>
                                    <div className={`target-reticle ${locked ? 'locked' : ''}`}>
                                        <div className="corner top-left"></div>
                                        <div className="corner top-right"></div>
                                        <div className="corner bottom-left"></div>
                                        <div className="corner bottom-right"></div>
                                        <div className="coordinates">
                                            <span>X: {coordinates.x}</span>
                                            <span>Y: {coordinates.y}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                    font-family: var(--font-mono);
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
                    overflow: hidden; /* Contain overlays */
                }

                /* Visual Overlays */
                .visual-overlay {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 400px;
                    pointer-events: none;
                    opacity: 0;
                    transform: translateX(20px);
                    transition: all 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 2rem;
                }
                
                .visual-overlay.active {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* IMPACT Styles */
                .score-display {
                    text-align: right;
                    font-family: var(--font-mono);
                }
                .score-val {
                    display: block;
                    font-size: 4rem;
                    font-weight: 700;
                    color: var(--accent-cyan);
                    line-height: 1;
                    text-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
                }
                .score-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: #666;
                    letter-spacing: 0.1em;
                }

                /* CRAFT Styles */
                .code-display {
                    font-family: 'Fira Code', 'Space Mono', monospace;
                    font-size: 1.5rem;
                    color: var(--accent-cyan);
                    background: rgba(0,0,0,0.5);
                    padding: 1rem;
                    border-radius: 4px;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                }
                .cursor {
                    animation: blink 1s step-end infinite;
                    color: #fff;
                }
                @keyframes blink { 50% { opacity: 0; } }

                /* PRECISION Styles (Target Locking) */
                .target-reticle {
                    position: relative;
                    width: 150px;
                    height: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .corner {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-color: rgba(255, 255, 255, 0.3);
                    border-style: solid;
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                
                .top-left { top: 0; left: 0; border-width: 2px 0 0 2px; }
                .top-right { top: 0; right: 0; border-width: 2px 2px 0 0; }
                .bottom-left { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
                .bottom-right { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

                /* Locked State */
                .target-reticle.locked .corner {
                    border-color: var(--accent-cyan);
                    box-shadow: 0 0 10px var(--accent-cyan);
                    width: 40px; /* Expand on lock or contract? Let's contract slightly towards center or just glow */
                }
                
                .visual-overlay.active .target-reticle .top-left { transform: translate(10px, 10px); }
                .visual-overlay.active .target-reticle .top-right { transform: translate(-10px, 10px); }
                .visual-overlay.active .target-reticle .bottom-left { transform: translate(10px, -10px); }
                .visual-overlay.active .target-reticle .bottom-right { transform: translate(-10px, -10px); }
                
                /* When locked, snap tight */
                .target-reticle.locked .top-left { transform: translate(30px, 30px); }
                .target-reticle.locked .top-right { transform: translate(-30px, 30px); }
                .target-reticle.locked .bottom-left { transform: translate(30px, -30px); }
                .target-reticle.locked .bottom-right { transform: translate(-30px, -30px); }

                .coordinates {
                    font-family: var(--font-mono);
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.5);
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                    text-align: center;
                }
                .target-reticle.locked .coordinates {
                    color: var(--accent-cyan);
                    font-weight: 700;
                    text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
                }

                .item-header {
                    display: flex;
                    align-items: baseline;
                    gap: 2rem;
                    cursor: pointer;
                    position: relative;
                    z-index: 2; /* Above overlay */
                }

                .item-number {
                    font-family: var(--font-mono);
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
                    position: relative; 
                    z-index: 2;
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
                    color: #888888;
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
                    .visual-overlay {
                        display: none; /* Hide visual clutter on mobile */
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
