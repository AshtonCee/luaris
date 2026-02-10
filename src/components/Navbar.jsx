import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to determine if we are on the home page
    const isHome = location.pathname === '/';

    const navLinks = [
        { name: 'Services', href: isHome ? '#services' : '/#services', isScroll: true },
        { name: 'Philosophy', href: isHome ? '#approach' : '/#approach', isScroll: true },
        { name: 'The Founder', href: '/founder', isScroll: false }
    ];

    return (
        <>
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '1.5rem 0',
                    transition: 'all 0.3s ease',
                    backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none'
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        letterSpacing: '-0.05em',
                        textTransform: 'uppercase',
                        color: 'var(--text-white)',
                        textDecoration: 'none',
                        textDecoration: 'none'
                    }}>
                        Luaris
                    </Link>

                    {/* Desktop Menu */}
                    <div style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => {
                                    if (isHome && link.isScroll) {
                                        const element = document.getElementById(link.href.replace('#', ''));
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                style={{
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    opacity: 0.8,
                                    color: 'var(--text-white)',
                                    textDecoration: 'none'
                                }}
                                className="nav-link"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button href="#contact" className="nav-cta">
                            Let's Talk
                        </Button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        style={{
                            zIndex: 1001,
                            color: 'var(--text-white)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="hamburger-btn"
                    >
                        <span style={{
                            width: '30px',
                            height: '2px',
                            backgroundColor: 'currentColor',
                            transition: 'transform 0.3s ease',
                            transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'
                        }}></span>
                        <span style={{
                            width: '30px',
                            height: '2px',
                            backgroundColor: 'currentColor',
                            opacity: isOpen ? 0 : 1,
                            transition: 'opacity 0.3s ease'
                        }}></span>
                        <span style={{
                            width: '30px',
                            height: '2px',
                            backgroundColor: 'currentColor',
                            transition: 'transform 0.3s ease',
                            transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'
                        }}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: 'var(--bg-black)',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)'
            }}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => {
                            setIsOpen(false);
                            if (isHome && link.isScroll) {
                                const element = document.getElementById(link.href.replace('#', ''));
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        style={{
                            fontSize: '2rem',
                            fontWeight: '300',
                            color: 'var(--text-white)',
                            textDecoration: 'none'
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        .nav-link:hover { opacity: 1 !important; }
      `}</style>
        </>
    );
};

export default Navbar;
