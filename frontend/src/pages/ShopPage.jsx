import axios from 'axios';
import { Filter, Search, ShoppingBag, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const Label = ({ text, active, slug, navigate, onClose }) => (
    <div
        onClick={() => {
            if (slug) navigate(`/products?category=${slug}`);
            else navigate('/products');
            if (onClose) onClose();
        }}
        style={{
            cursor: 'pointer',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
            color: active ? 'var(--accent)' : 'var(--text-main)',
            fontWeight: active ? '700' : '500',
            transition: 'var(--transition)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.9rem'
        }}
    >
        {text}
        {active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>}
    </div>
);

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = (e) => {
        e.stopPropagation();
        dispatch(addToCart({ ...product, qty: 1 }));
        // Custom Toast or Alert would be better, but sticking to logic
    };

    return (
        <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
            <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', backgroundColor: '#fcfcfc' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <button
                        onClick={addToCartHandler}
                        className="glass"
                        style={{ padding: '0.6rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                    >
                        <ShoppingBag size={18} color="var(--primary)" />
                    </button>
                </div>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.05em' }}>
                        {product.category?.replace('-', ' ')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                        <Star size={12} fill="currentColor" />
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>{product.rating}</span>
                    </div>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', lineHeight: '1.3' }}>{product.name}</h3>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>{product.numReviews} Reviews</span>
                </div>
            </div>
        </div>
    );
};

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category');
    const keyword = queryParams.get('keyword');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products');
                let filteredProducts = data;

                if (selectedCategory) {
                    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
                }

                if (keyword) {
                    filteredProducts = filteredProducts.filter(p =>
                        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
                        p.description.toLowerCase().includes(keyword.toLowerCase())
                    );
                }

                setProducts(filteredProducts);
                setLoading(false);
            } catch (error) {
                setError('Failed to load products. Please try again.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, keyword]);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen]);

    const FilterList = ({ onClose }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label text="All Collections" active={!selectedCategory} navigate={navigate} onClose={onClose} />
            <Label text="Living Room" active={selectedCategory === 'living-room'} slug="living-room" navigate={navigate} onClose={onClose} />
            <Label text="Kitchen & Appliances" active={selectedCategory === 'kitchen'} slug="kitchen" navigate={navigate} onClose={onClose} />
            <Label text="Bedroom" active={selectedCategory === 'bedroom'} slug="bedroom" navigate={navigate} onClose={onClose} />
            <Label text="Office" active={selectedCategory === 'office'} slug="office" navigate={navigate} onClose={onClose} />
        </div>
    );

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--accent-soft)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
            {/* Page Header */}
            <div style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '3rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                <ShoppingBag size={16} /> Premium Catalog
                            </div>
                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                                {keyword ? `Search: ${keyword}` : selectedCategory ? selectedCategory.replace('-', ' ') : 'Our Collection'}
                            </h1>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="show-mobile btn btn-primary"
                                style={{ borderRadius: '2rem', padding: '0.75rem 1.5rem' }}
                            >
                                <Filter size={18} /> Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 0' }}>
                <div className="flex-stack" style={{ alignItems: 'flex-start', gap: '3rem' }}>

                    {/* Desktop Sidebar */}
                    <aside className="hide-mobile" style={{ flex: '0 0 280px', position: 'sticky', top: '7rem' }}>
                        <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Filter size={18} /> Categories
                            </h3>
                            <FilterList />

                            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Price Range</h3>
                                <input type="range" style={{ width: '100%', accentColor: 'var(--accent)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                    <span>₹0</span>
                                    <span>₹1L+</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {isSidebarOpen && (
                        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
                            <div
                                className="animate-fade"
                                style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(2, 6, 23, 0.4)', backdropFilter: 'blur(4px)' }}
                                onClick={() => setIsSidebarOpen(false)}
                            ></div>
                            <div
                                className="animate-slide-right"
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    borderLeft: '1px solid rgba(255,255,255,0.3)',
                                    width: '85%',
                                    maxWidth: '350px',
                                    height: '100%',
                                    padding: '2.5rem',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                    <h2 style={{ fontSize: '1.5rem' }}>Filters</h2>
                                    <button onClick={() => setIsSidebarOpen(false)} style={{ color: 'var(--text-main)', background: 'var(--accent-soft)', borderRadius: '50%', display: 'flex', padding: '0.5rem' }}>
                                        <X size={24} />
                                    </button>
                                </div>
                                <FilterList onClose={() => setIsSidebarOpen(false)} />
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div style={{ flex: 1 }}>
                        {error ? (
                            <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Something went wrong</h2>
                                <p style={{ color: 'var(--text-muted)' }}>{error}</p>
                                <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginTop: '2rem' }}>Retry</button>
                            </div>
                        ) : products.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '8rem 2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border)' }}>
                                <Search size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.5 }} />
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No items found</h2>
                                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search keywords.</p>
                                <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '2rem' }}>Clear All Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 grid-cols-2 grid-cols-3" style={{ gap: '2.5rem' }}>
                                {products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
