import { Armchair, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navLinkStyle = (path) => ({
        padding: '0.6rem 1.2rem',
        borderRadius: '0.75rem',
        fontSize: '0.85rem',
        fontWeight: '800',
        color: isActive(path) ? 'var(--accent)' : 'var(--text-main)',
        backgroundColor: isActive(path) ? 'var(--accent-soft)' : 'transparent',
        transition: 'var(--transition)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${searchQuery}`);
            setSearchQuery('');
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid var(--border)'
        }}>
            <div className="container" style={{
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Brand Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <Armchair size={24} />
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.03em' }}>
                        ARC<span style={{ color: 'var(--accent)' }}>STORE</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hide-mobile" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Link to="/" style={navLinkStyle('/')}>Home</Link>
                    <Link to="/products" style={navLinkStyle('/products')}>Shop</Link>
                    <Link to="/about" style={navLinkStyle('/about')}>About</Link>
                </nav>

                {/* Interaction Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <form onSubmit={handleSearch} className="hide-mobile" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                backgroundColor: 'var(--background)',
                                border: '1px solid var(--border)',
                                borderRadius: '2rem',
                                padding: '0.6rem 1rem 0.6rem 2.8rem',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                outline: 'none',
                                width: '160px',
                                transition: 'var(--transition)'
                            }}
                            onFocus={(e) => {
                                e.target.style.width = '240px';
                                e.target.style.borderColor = 'var(--accent)';
                            }}
                            onBlur={(e) => {
                                e.target.style.width = '160px';
                                e.target.style.borderColor = 'var(--border)';
                            }}
                        />
                        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    </form>

                    <Link to="/cart" style={{
                        position: 'relative',
                        color: 'var(--primary)',
                        padding: '0.6rem',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        transition: 'var(--transition)',
                        backgroundColor: 'var(--accent-soft)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-soft)';
                            e.currentTarget.style.color = 'var(--primary)';
                        }}
                    >
                        <ShoppingBag size={22} />
                        {cartItems.length > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                fontSize: '0.65rem',
                                fontWeight: '900',
                                height: '18px',
                                width: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>{cartItems.length}</span>
                        )}
                    </Link>

                    {/* Mobile Menu Icon (Show on < 1024px) */}
                    <button
                        className="show-mobile"
                        onClick={() => setIsMobileMenuOpen(true)}
                        style={{
                            color: isMobileMenuOpen ? 'var(--accent)' : 'var(--primary)',
                            padding: '0.6rem',
                            borderRadius: '0.75rem',
                            transition: 'var(--transition)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Navigation */}
            {isMobileMenuOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
                    <div
                        className="animate-fade"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(2, 6, 23, 0.4)',
                            backdropFilter: 'blur(10px)'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                    <div
                        className="animate-slide-up"
                        style={{
                            position: 'relative',
                            backgroundColor: 'var(--surface)',
                            width: '90%',
                            maxWidth: '400px',
                            margin: '2rem auto',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2.5rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: '900', fontSize: '1.4rem', color: 'var(--primary)', letterSpacing: '-0.02em' }}>MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-main)', background: 'var(--accent-soft)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link to="/" style={{ ...navLinkStyle('/'), padding: '1.25rem', fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Home Landing</Link>
                            <Link to="/products" style={{ ...navLinkStyle('/products'), padding: '1.25rem', fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Shop Collection</Link>
                            <Link to="/about" style={{ ...navLinkStyle('/about'), padding: '1.25rem', fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Our Legacy</Link>
                        </nav>
                        <div style={{ marginTop: 'auto', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Quick Find</p>
                            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Looking for something?..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--background)',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                                <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
