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

    // Animation Refs (Direct DOM Manipulation)
    const impactNumRef = useRef(null);
    const impactCircleRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Craft: Code Typing State
    const [codeIndex, setCodeIndex] = useState(0);
    const codeSnippet = [
        { text: '<', color: 'grey' },
        { text: 'Craft', color: 'cyan' },
        { text: ' mode', color: 'purple' },
        { text: '=', color: 'grey' },
        { text: '"', color: 'green' },
        { text: 'hand-coded', color: 'green' },
        { text: '"', color: 'green' },
        { text: ' />', color: 'grey' },
    ];
    // Flattened for typing logic
    const fullText = '<Craft mode="hand-coded" />';

    // Precision State
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [locked, setLocked] = useState(false);

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
        // Cleanup function for all animations
        const cleanup = () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (typingRef.current) clearInterval(typingRef.current);
            if (scrambleRef.current) clearInterval(scrambleRef.current);
        };
        cleanup();

        if (hoveredIndex === 0) { // IMPACT - Direct DOM Animation
            const duration = 2000; // 2 seconds
            const start = 0;
            const end = 100;
            const startTime = performance.now();
            const circumference = 2 * Math.PI * 70; // r=70

            const easeOutExpo = (t) => {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            };

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutExpo(progress);

                const currentValue = Math.floor(start + (end - start) * easedProgress);

                // Direct DOM updates
                if (impactNumRef.current) {
                    impactNumRef.current.textContent = currentValue;
                }
                if (impactCircleRef.current) {
                    const offset = circumference - (easedProgress * circumference);
                    impactCircleRef.current.style.strokeDashoffset = offset;
                }

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                } else {
                    // Ensure final state
                    if (impactNumRef.current) impactNumRef.current.textContent = end;
                    if (impactCircleRef.current) impactCircleRef.current.style.strokeDashoffset = 0;
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);

        } else if (hoveredIndex === 1) { // CRAFT - Visual Typing
            let charCount = 0;
            setCodeIndex(0);

            typingRef.current = setInterval(() => {
                charCount++;
                setCodeIndex(charCount);
                if (charCount >= fullText.length) {
                    clearInterval(typingRef.current);
                }
            }, 50);

        } else if (hoveredIndex === 2) { // PRECISION - Target Locking
            setLocked(false);

            // Phase 1: Rapid Search (Random Large Jumps)
            let steps = 0;
            const maxSteps = 20; // 400ms search

            scrambleRef.current = setInterval(() => {
                steps++;
                setCoordinates({
                    x: (Math.random() * 800 + 100).toFixed(2),
                    y: (Math.random() * 600 + 100).toFixed(2)
                });

                // Phase 2: Locking (Center Snapping with Glitch)
                if (steps > maxSteps) {
                    clearInterval(scrambleRef.current);

                    // Trigger Lock
                    setCoordinates({ x: '512.42', y: '384.90' }); // Fixed "Center"
                    setLocked(true);
                }
            }, 30);
        } else {
            // Reset states when leaving
            if (impactNumRef.current) impactNumRef.current.textContent = '0';
            if (impactCircleRef.current) {
                const circumference = 2 * Math.PI * 70;
                impactCircleRef.current.style.strokeDashoffset = circumference;
            }
            setCodeIndex(0);
            setLocked(false);
            setCoordinates({ x: 0, y: 0 });
        }

        return cleanup;
    }, [hoveredIndex]);

    // Helper to render colored code based on current character index
    const renderCode = () => {
        let rendered = [];
        let currentLength = 0;

        for (let part of codeSnippet) {
            if (currentLength >= codeIndex) break;

            const remainingCheck = codeIndex - currentLength;
            const textToShow = part.text.substring(0, remainingCheck);

            rendered.push(
                <span key={currentLength} className={`code-${part.color}`}>
                    {textToShow}
                </span>
            );

            currentLength += part.text.length;
        }
        return rendered;
    };

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
                            {/* Visual Overlays - Z-Index 0 (Behind Text) */}
                            {index === 0 && ( /* IMPACT */
                                <div className={`visual-overlay impact-overlay ${hoveredIndex === 0 ? 'active' : ''}`}>
                                    <div className="impact-graphic">
                                        <svg className="progress-ring" width="160" height="160">
                                            <circle
                                                className="progress-ring__circle-bg"
                                                stroke="#333"
                                                strokeWidth="4"
                                                fill="transparent"
                                                r="70"
                                                cx="80"
                                                cy="80"
                                            />
                                            <circle
                                                ref={impactCircleRef} // Direct Ref
                                                className="progress-ring__circle"
                                                stroke="var(--accent-cyan)"
                                                strokeWidth="4"
                                                fill="transparent"
                                                r="70"
                                                cx="80"
                                                cy="80"
                                                style={{
                                                    strokeDasharray: `${2 * Math.PI * 70} ${2 * Math.PI * 70}`,
                                                    strokeDashoffset: 2 * Math.PI * 70 // Start empty
                                                }}
                                            />
                                        </svg>
                                        <div className="score-center">
                                            <span ref={impactNumRef} className="score-val">0</span>
                                        </div>
                                    </div>
                                    <span className="score-label">Lighthouse Score</span>
                                </div>
                            )}

                            {index === 1 && ( /* CRAFT */
                                <div className={`visual-overlay craft-overlay ${hoveredIndex === 1 ? 'active' : ''}`}>
                                    <div className="code-window">
                                        <div className="code-header">
                                            <span className="dot red"></span>
                                            <span className="dot yellow"></span>
                                            <span className="dot green"></span>
                                        </div>
                                        <div className="code-content">
                                            {renderCode()}
                                            {/* Cursor Removed */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {index === 2 && ( /* PRECISION */
                                <div className={`visual-overlay precision-overlay ${hoveredIndex === 2 ? 'active' : ''}`}>
                                    <div className={`target-reticle ${locked ? 'locked' : ''}`}>
                                        {/* Rotating Ring */}
                                        <div className="reticle-ring"></div>

                                        <div className="corner top-left"></div>
                                        <div className="corner top-right"></div>
                                        <div className="corner bottom-left"></div>
                                        <div className="corner bottom-right"></div>

                                        <div className="coordinates">
                                            <span>X: {coordinates.x}</span>
                                            <span>Y: {coordinates.y}</span>
                                        </div>

                                        {/* Status Text inside Reticle */}
                                        <div className="status-text">
                                            {locked ? 'TARGET LOCKED' : 'SCANNING...'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Content - Z-Index 2 (Above Overlay) */}
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
                .section-header { margin-bottom: 2rem; }

                .section-label {
                    display: block;
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                    color: var(--accent-cyan);
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                }

                .philosophy-list { display: flex; flex-direction: column; }

                .philosophy-item {
                    position: relative;
                    padding: 2rem 0;
                    cursor: default;
                    overflow: hidden;
                }

                /* Visual Overlays - Positioned Absolute Behind Text */
                .visual-overlay {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 50%; /* Flexible width */
                    max-width: 500px;
                    pointer-events: none;
                    opacity: 0;
                    transform: translateX(20px);
                    transition: all 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center; /* Center graphic within overlay area */
                    z-index: 0; /* Behind Text */
                    padding-right: 2rem;
                }
                
                .visual-overlay.active {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* Responsive Clipping Fix: Fade out overlays on smaller screens */
                @media (max-width: 1200px) {
                    .visual-overlay {
                        opacity: 0.15 !important; /* Force low opacity to avoid clash */
                        width: 100%; /* Take full width to center behind text */
                        justify-content: center;
                        padding-right: 0;
                        transform: scale(0.9);
                    }
                    .visual-overlay.active {
                        transform: scale(1);
                    }
                }
                @media (max-width: 768px) {
                    .visual-overlay { display: none; } /* Hide completely on mobile */
                }


                /* IMPACT Styles */
                .impact-graphic {
                    position: relative;
                    width: 160px;
                    height: 160px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .progress-ring__circle {
                    transition: stroke-dashoffset 0.1s linear;
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                }
                .score-center {
                    position: absolute;
                    text-align: center;
                }
                .score-val {
                    font-family: var(--font-mono);
                    font-size: 3rem;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -2px;
                }
                .score-label {
                    display: block;
                    position: absolute;
                    bottom: 2rem; /* Below ring */
                    right: 4rem;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: var(--accent-cyan);
                    letter-spacing: 0.1em;
                }

                /* CRAFT Styles */
                .code-window {
                    background: #111;
                    border: 1px solid #333;
                    border-radius: 8px;
                    padding: 1.5rem;
                    width: 320px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .code-header {
                    display: flex;
                    gap: 6px;
                    margin-bottom: 1rem;
                }
                .dot { width: 10px; height: 10px; border-radius: 50%; }
                .red { background: #ff5f56; }
                .yellow { background: #ffbd2e; }
                .green { background: #27c93f; }

                .code-content {
                    font-family: 'Fira Code', 'Space Mono', monospace;
                    font-size: 1.1rem;
                    line-height: 1.5;
                }
                
                .code-grey { color: #666; }
                .code-cyan { color: var(--accent-cyan); }
                .code-purple { color: var(--accent-indigo); }
                .code-green { color: #27c93f; }
                
                .cursor {
                    display: inline-block;
                    width: 8px;
                    height: 1.2rem;
                    background: var(--accent-cyan);
                    margin-left: 4px;
                    vertical-align: middle;
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink { 50% { opacity: 0; } }

                /* PRECISION Styles */
                .target-reticle {
                    position: relative;
                    width: 140px;
                    height: 140px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .reticle-ring {
                    position: absolute;
                    inset: -10px;
                    border: 1px dashed rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    animation: rotate 10s linear infinite;
                    pointer-events: none;
                }
                .target-reticle.locked .reticle-ring {
                    border-color: rgba(0, 240, 255, 0.3);
                    border-style: solid;
                    border-top-color: transparent; /* Gap effect */
                    animation-duration: 2s; /* Speed up on lock */
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .corner {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-color: rgba(255, 255, 255, 0.2);
                    border-style: solid;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .top-left { top: 0; left: 0; border-width: 2px 0 0 2px; }
                .top-right { top: 0; right: 0; border-width: 2px 2px 0 0; }
                .bottom-left { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
                .bottom-right { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

                .target-reticle.locked .corner {
                    border-color: var(--accent-cyan);
                    box-shadow: 0 0 10px var(--accent-cyan);
                    width: 25px; /* Slight expansion */
                    height: 25px;
                }
                
                .coordinates {
                    font-family: var(--font-mono);
                    font-size: 0.7rem;
                    color: #555;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    margin-bottom: 0.5rem;
                }
                .target-reticle.locked .coordinates {
                    color: #fff;
                    text-shadow: 0 0 5px var(--accent-cyan);
                }

                .status-text {
                    font-family: var(--font-display);
                    font-size: 0.6rem;
                    letter-spacing: 0.2em;
                    color: #444;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                }
                .target-reticle.locked .status-text {
                    color: var(--accent-cyan);
                    text-shadow: 0 0 8px var(--accent-cyan);
                    font-weight: 700;
                    animation: pulse 1s ease-in-out infinite alternate;
                }

                @keyframes pulse {
                    from { opacity: 0.6; }
                    to { opacity: 1; }
                }

                /* Text Overlay Handling */
                .item-header {
                    display: flex;
                    align-items: baseline;
                    gap: 2rem;
                    cursor: pointer;
                    position: relative;
                    z-index: 2; /* Ensure Text is Above Graphic */
                }

                .item-number {
                    font-family: var(--font-mono);
                    font-size: 1.2rem;
                    color: #444;
                    transition: color 0.4s ease;
                }
                .item-number.active { color: var(--accent-cyan); }

                .item-title {
                    font-size: clamp(2rem, 5vw, 4rem);
                    font-weight: 700;
                    color: #fff;
                    margin: 0;
                    line-height: 0.9;
                    letter-spacing: -0.02em;
                    transition: transform 0.4s ease, color 0.4s ease;
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
                    z-index: 2; /* Text above graphic */
                }
                .item-body.open { max-height: 200px; }

                .body-inner {
                    padding-top: 1.5rem;
                    padding-left: calc(2rem + 1.2rem);
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
                    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo));
                }

                /* Mobile Adjustments */
                @media (max-width: 768px) {
                    .item-title { font-size: 2.8rem; }
                    .item-title.active { transform: translateX(10px); }
                    .body-inner { padding-left: 0; }
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
