import { Armchair, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => ({
        fontWeight: '500',
        color: isActive(path) ? 'var(--accent)' : 'var(--text-main)',
        transition: 'color 0.3s ease',
        position: 'relative'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${searchQuery}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <header style={{
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease'
        }}>
            <div className="container" style={{
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', textDecoration: 'none' }}>
                    <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex' }}>
                        <Armchair size={24} />
                    </div>
                    <span>ARC<span style={{ color: 'var(--accent)' }}>STORE</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={linkStyle('/')}>Home</Link>
                    <Link to="/products" style={linkStyle('/products')}>Shop</Link>
                    <Link to="/about" style={linkStyle('/about')}>About</Link>
                </nav>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        {isSearchOpen ? (
                            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.25rem 0.5rem', width: '250px', boxShadow: 'var(--shadow-md)' }}>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    style={{ border: 'none', outline: 'none', padding: '0.4rem', fontSize: '0.9rem', width: '100%', backgroundColor: 'transparent' }}
                                />
                                <button type="button" onClick={() => setIsSearchOpen(false)} style={{ color: 'var(--text-muted)', padding: '0.2rem' }}>
                                    <X size={18} />
                                </button>
                            </form>
                        ) : (
                            <button onClick={() => setIsSearchOpen(true)} style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} className="hover-text-primary">
                                <Search size={20} />
                            </button>
                        )}
                    </div>
                    <Link to="/cart" style={{ position: 'relative', color: 'var(--text-main)', transition: 'transform 0.2s' }}>
                        <ShoppingCart size={22} />
                        {cartItems.length > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'var(--accent)',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                height: '18px',
                                width: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>{cartItems.length}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
