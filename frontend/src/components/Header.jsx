import { Armchair, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => ({
        fontWeight: '700',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: isActive(path) ? 'var(--accent)' : 'var(--text-main)',
        transition: 'color 0.3s ease',
        textDecoration: 'none'
    });

    const mobileLinkStyle = (path) => ({
        ...linkStyle(path),
        fontSize: '1.25rem',
        padding: '1rem 0',
        borderBottom: '1px solid var(--border)',
        width: '100%'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${searchQuery}`);
            setSearchQuery('');
        }
    };

    return (
        <header style={{
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: 'var(--shadow-sm)'
        }}>
            <div className="container" style={{
                height: '4.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Mobile Menu Toggle */}
                <button
                    className="show-mobile"
                    onClick={() => setIsMobileMenuOpen(true)}
                    style={{ color: 'var(--text-main)', padding: '0.5rem' }}
                >
                    <Menu size={24} />
                </button>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', textDecoration: 'none' }}>
                    <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex' }}>
                        <Armchair size={24} />
                    </div>
                    <span style={{ fontSize: '1.25rem' }}>ARC<span style={{ color: 'var(--accent)' }}>STORE</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hide-mobile" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link to="/" style={linkStyle('/')}>Home</Link>
                    <Link to="/products" style={linkStyle('/products')}>Shop</Link>
                    <Link to="/about" style={linkStyle('/about')}>About</Link>
                </nav>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
                                padding: '0.5rem 1rem 0.5rem 2.5rem',
                                fontSize: '0.85rem',
                                outline: 'none',
                                width: '180px',
                                transition: 'width 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.width = '240px'}
                            onBlur={(e) => e.target.style.width = '180px'}
                        />
                        <Search size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    </form>

                    <Link to="/cart" style={{ position: 'relative', color: 'var(--text-main)' }}>
                        <ShoppingCart size={24} />
                        {cartItems.length > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-6px',
                                backgroundColor: 'var(--accent)',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: '900',
                                height: '18px',
                                width: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 0 2px var(--surface)'
                            }}>{cartItems.length}</span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'var(--surface)', zIndex: 110, padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
                        <button onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-main)' }}>
                            <X size={32} />
                        </button>
                    </div>
                    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Link to="/" style={mobileLinkStyle('/')} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/products" style={mobileLinkStyle('/products')} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                        <Link to="/about" style={mobileLinkStyle('/about')} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                        <div style={{ marginTop: '2rem', width: '100%' }}>
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--background)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </form>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
