import React, { useEffect, useRef } from 'react';

const services = [
    {
        title: 'Website Design',
        description: 'Immersive Digital Design Agency grade aesthetics that captivate from the first pixel. We blend high-fidelity visuals with Responsive layouts for maximum impact.',
        deliverables: ['Visual Identity', 'Hi-Fi Mockups'],
        icon: 'layout'
    },
    {
        title: 'Web Development',
        description: 'Precision engineering using Modern Tech Stacks for blazing fast performance. Our Full-Stack solutions ensure scalable, pixel-perfect execution.',
        deliverables: ['Modern Frameworks', 'CMS Integration'],
        icon: 'code'
    },
    {
        title: 'UI/UX Design',
        description: 'Intuitive UX/UI Design journeys that guide users seamlessly. We prototype complex interactions to ensure a fluid technical experience.',
        deliverables: ['Prototyping', 'User Research'],
        icon: 'pen-tool'
    },
    {
        title: 'SEO Optimization',
        description: 'Climb rankings with High-Performance SEO strategies that work. We drive sustainable Organic Traffic through technical optimization and keyword precision.',
        deliverables: ['Technical SEO', 'Keyword Strategy'],
        icon: 'trending-up'
    },
    {
        title: 'Digital Products',
        description: 'Complex web applications engineered for scale. We build secure, high-utility platforms designed to maximize user engagement and ROI.',
        deliverables: ['SaaS / Web Apps', 'System Architecture'],
        icon: 'server'
    },
    {
        title: 'Brand Strategy',
        description: 'Defining your unique voice in the Digital Design landscape. We align visual identity with market positioning for a confident, unified brand presence.',
        deliverables: ['Logo Design', 'Brand Guidelines'],
        icon: 'target'
    }
];

const Expertise = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current.querySelectorAll('.section-header');
        elements.forEach((el) => observer.observe(el));

        // Animate grid items separately
        const items = sectionRef.current.querySelectorAll('.service-card-wrapper');
        items.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="services"
            className="section"
            ref={sectionRef}
            style={{
                padding: '120px 0',
                backgroundColor: 'var(--bg-black)', // Match other sections
            }}
        >
            <div className="container">
                {/* Stacked Heading - Top */}
                <div className="section-header">
                    <span className="section-label">01 — Services</span>
                    <h2 className="section-title heading-glow">Our Expertise</h2>
                </div>

                {/* Grid */}
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card-wrapper"
                            style={{ transitionDelay: `${index * 0.1}s` }} // Only affects entry!
                        >
                            <div className="service-card">
                                <div className="card-top">
                                    {/* Placeholder Icon with Tech Style */}
                                    <div className="icon-badge"></div>
                                    <h3>{service.title}</h3>
                                </div>
                                <p>{service.description}</p>

                                <div className="deliverables">
                                    {service.deliverables.map((d, i) => (
                                        <span key={i} className="pill">{d}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .section-header {
            margin-bottom: 5rem;
            text-align: left;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }
        .section-header.in-view {
            opacity: 1;
            transform: translateY(0);
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
            font-size: clamp(2.5rem, 5vw, 4rem);
            color: #fff;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }

        /* 
           Wrapper handles the entry animation (staggered).
           Inner card handles the hover state.
           This separates the delays so hover is INSTANT.
        */
        .service-card-wrapper {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .service-card-wrapper.in-view {
            opacity: 1;
            transform: translateY(0);
        }

        .service-card {
            background: #0f0f0f;
            border: 1px solid #1a1a1a;
            padding: 2.5rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            transition: all 0.2s ease-out; /* Super snappy hover */
            position: relative;
            overflow: hidden;
        }

        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        }

        .service-card:hover {
            transform: translateY(-5px);
            border-color: #333;
            background: #141414;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .service-card:hover::before {
            transform: scaleX(1);
        }

        .icon-badge {
            width: 10px;
            height: 10px;
            background: var(--accent-cyan);
            margin-bottom: 1.5rem;
            box-shadow: 0 0 10px var(--accent-cyan), 0 0 20px var(--accent-indigo);
        }

        .card-top h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #fff;
        }

        .service-card p {
            color: #888888; /* Lighter for WCAG AA+ Compliance - Updated */
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            flex-grow: 1;
        }

        .deliverables {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .pill {
            font-size: 0.75rem;
            font-family: var(--font-mono);
            color: #ccc;
            border: 1px solid #333;
            padding: 0.25rem 0.75rem;
            border-radius: 2px; /* Techy square radius */
        }
      `}</style>
        </section >
    );
};

export default Expertise;
