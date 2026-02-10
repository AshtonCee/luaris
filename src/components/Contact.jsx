import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interest: 'Free Site Audit',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, sending, success, error

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("https://formsubmit.co/ajax/ashtonwcoplin@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    interest: formData.interest,
                    message: formData.message,
                    _subject: `New Inquiry: ${formData.interest} - ${formData.name}`,
                    _template: 'table' // Makes the email look nicer
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', interest: 'Development', message: '' });
                // Reset status after 5 seconds so they can send another if needed
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Form error:", error);
            setStatus('error');
        }
    };

    return (
        <footer id="contact" ref={sectionRef} style={{
            backgroundColor: 'var(--bg-black)',
            padding: '120px 0 40px',
            color: '#fff',
        }}>
            <div className="container">
                <div className="contact-layout">

                    {/* Left: Heading & Info */}
                    <div className="contact-info">
                        <div className="animate-item section-header">
                            <span className="section-label">04 — Contact</span>
                            <h2 className="section-title heading-glow">Start a Project</h2>
                        </div>

                        <div className="animate-item delay-1" style={{ marginBottom: '3rem' }}>
                            <p style={{ color: '#888888', fontSize: '1.1rem', maxWidth: '400px', lineHeight: '1.6' }}>
                                Ready to architect the next big thing? Tell us about your vision, or <strong className="glow-text">request a Free Site Audit</strong> to uncover hidden performance bottlenecks. We handle the rest.
                            </p>
                        </div>
                    </div>

                    {/* Right: The Form */}
                    <div className="contact-form-wrapper animate-item delay-1" style={{
                        background: '#0a0a0a',
                        border: '1px solid #333',
                        padding: '2.5rem'
                    }}>
                        <form onSubmit={handleSubmit} className="tech-form">

                            {/* Hidden FormSubmit settings */}
                            <input type="hidden" name="_captcha" value="false" />

                            <div className="form-group">
                                <label>What's your name?</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Your email address?</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>What are you interested in?</label>
                                <div className="select-wrapper">
                                    <select
                                        name="interest"
                                        value={formData.interest}
                                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                    >
                                        <option value="Brand Strategy">Brand Strategy</option>
                                        <option value="Digital Products">Digital Products</option>
                                        <option value="Free Site Audit">Free Site Audit</option>
                                        <option value="SEO Optimization">SEO Optimization</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Website Design">Website Design</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tell us about the project</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    placeholder="Project goals, timeline, budget..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <Button type="submit" className="submit-btn" disabled={status === 'sending' || status === 'success'}>
                                {status === 'sending' ? 'Sending...' : status === 'success' ? '✔ Application Received' : status === 'error' ? 'Error. Try again.' : 'Send Inquiry'}
                            </Button>

                            {status === 'success' && (
                                <p className="success-msg">
                                    We've received your inquiry and will be in touch within 24 hours.
                                </p>
                            )}

                        </form>
                    </div>

                </div>

                <div className="footer-bottom animate-item delay-3">
                    <div>
                        &copy; {new Date().getFullYear()} Luaris.<br />All Rights Reserved.
                    </div>
                    <div className="location-box">
                        Kansas City, KS
                    </div>
                </div>
            </div>

            <style>{`
         .contact-layout {
             display: grid;
             grid-template-columns: 1fr;
             gap: 4rem;
         }

         @media (min-width: 992px) {
             .contact-layout {
                 grid-template-columns: 1fr 1fr;
                 gap: 6rem;
             }
         }

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

        .section-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            color: #fff;
        }

         .footer-bottom {
             margin-top: 80px;
             padding-top: 2rem;
             border-top: 1px solid #1a1a1a;
             color: #666;
             font-size: 0.9rem;
             display: flex;
             justify-content: space-between;
             align-items: flex-end;
         }

         .location-box {
             text-transform: uppercase;
             letter-spacing: 0.1em;
             color: #888;
         }

         /* Form Styling */
         .tech-form {
             display: flex;
             flex-direction: column;
             gap: 2rem;
         }

         .form-group label {
             display: block;
             font-family: var(--font-display);
             font-size: 0.9rem;
             color: #fff;
             margin-bottom: 0.75rem;
         }

         .form-group input, 
         .form-group textarea, 
         .form-group select {
             width: 100%;
             background: #0a0a0a;
             border: 1px solid #333;
             padding: 1rem;
             color: #fff;
             font-family: var(--font-body);
             font-size: 1rem;
             border-radius: 4px; /* Techy subtle radius */
             transition: all 0.3s ease;
         }

         .form-group input:focus, 
         .form-group textarea:focus,
         .form-group select:focus {
             outline: none;
             border-color: var(--accent-cyan);
             box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
             background: #0f0f0f;
         }

         .submit-btn {
             align-self: flex-start;
         }

         .submit-btn:disabled {
             opacity: 0.7;
             cursor: default;
             background: rgba(0, 240, 255, 0.1);
         }
         
         .success-msg {
             color: var(--accent-cyan);
             font-family: var(--font-display);
             font-size: 0.9rem;
             margin-top: -1rem;
             animation: fadeIn 0.5s ease;
         }
         
         @keyframes fadeIn {
             from { opacity: 0; transform: translateY(10px); }
             to { opacity: 1; transform: translateY(0); }
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
        .delay-1 { transition-delay: 0.2s; }
         .delay-2 { transition-delay: 0.4s; }
         .delay-3 { transition-delay: 0.6s; }

         .glow-text {
             color: #fff;
             transition: all 0.3s ease;
             cursor: pointer;
             position: relative;
             display: inline-block;
         }
         
         .glow-text:hover {
             color: var(--accent-cyan);
             text-shadow: 0 0 15px rgba(0, 240, 255, 0.6), 0 0 30px rgba(0, 240, 255, 0.4);
         }
      `}</style>
        </footer>
    );
};

export default Contact;
