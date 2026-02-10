import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    href,
    to,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {

    const baseStyles = {
        padding: '1rem 3rem',
        border: '1px solid var(--accent-cyan)',
        color: 'var(--accent-cyan)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: '0.9rem',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        background: 'rgba(0, 240, 255, 0.05)',
        cursor: 'pointer',
        display: 'inline-block',
        textAlign: 'center'
    };

    const hoverStyles = `
        .custom-btn:hover {
            background: var(--accent-cyan) !important;
            color: #000 !important;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
        }
    `;

    const combinedClassName = `custom-btn ${className}`;

    if (to) {
        return (
            <>
                <style>{hoverStyles}</style>
                <Link to={to} style={baseStyles} className={combinedClassName} {...props}>
                    {children}
                </Link>
            </>
        );
    }

    if (href) {
        return (
            <>
                <style>{hoverStyles}</style>
                <a href={href} style={baseStyles} className={combinedClassName} {...props}>
                    {children}
                </a>
            </>
        );
    }

    return (
        <>
            <style>{hoverStyles}</style>
            <button type={type} onClick={onClick} style={baseStyles} className={combinedClassName} {...props}>
                {children}
            </button>
        </>
    );
};

export default Button;
