import axios from 'axios';
import { Filter, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const Label = ({ text, active, slug, navigate, onClose }) => (
    <div
        onClick={() => {
            if (slug) {
                navigate(`/products?category=${slug}`);
            } else {
                navigate('/products');
            }
            if (onClose) onClose();
        }}
        style={{
            cursor: 'pointer',
            color: active ? 'var(--accent)' : 'var(--text-main)',
            fontWeight: active ? '600' : '400',
            transition: 'color 0.2s',
            padding: '0.5rem 0'
        }}
    >
        {text}
    </div>
);

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = (e) => {
        e.stopPropagation();
        dispatch(addToCart({ ...product, qty: 1 }));
        alert("Added to Cart!");
    };

    return (
        <div
            onClick={() => navigate(`/product/${product._id}`)}
            style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                transition: 'var(--transition)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}>
            <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
            </div>
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{product.category}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.3' }}>{product.name}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} />
                        ))}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({product.numReviews})</span>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                        onClick={addToCartHandler}
                    >
                        + Add
                    </button>
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
                setError(null);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message || 'Failed to fetch products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, keyword]);

    const FilterContent = ({ onClose }) => (
        <>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem' }}>Category</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Label text="All Products" active={!selectedCategory} navigate={navigate} onClose={onClose} />
                    <Label text="Living Room" active={selectedCategory === 'living-room'} slug="living-room" navigate={navigate} onClose={onClose} />
                    <Label text="Kitchen & Appliances" active={selectedCategory === 'kitchen'} slug="kitchen" navigate={navigate} onClose={onClose} />
                    <Label text="Bedroom" active={selectedCategory === 'bedroom'} slug="bedroom" navigate={navigate} onClose={onClose} />
                    <Label text="Office" active={selectedCategory === 'office'} slug="office" navigate={navigate} onClose={onClose} />
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem' }}>Price Range</h3>
                <input type="range" style={{ width: '100%', accentColor: 'var(--accent)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    <span>₹0</span>
                    <span>₹1,00,000+</span>
                </div>
            </div>
        </>
    );

    if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                            {keyword ? `Results for "${keyword}"` : selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}` : 'Shop All'}
                        </h1>
                        <p style={{ color: 'var(--text-muted)' }}>Showing {products.length} products</p>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="btn show-mobile"
                        style={{ border: '1px solid var(--border)', gap: '0.5rem' }}
                    >
                        <Filter size={18} /> Filter
                    </button>
                </div>

                <div className="flex-stack">
                    {/* Desktop Sidebar */}
                    <aside className="hide-mobile" style={{ flex: '0 0 250px' }}>
                        <div style={{ position: 'sticky', top: '6rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: '800', fontSize: '1.1rem' }}>
                                <Filter size={20} /> FILTERS
                            </div>
                            <FilterContent />
                        </div>
                    </aside>

                    {/* Mobile Sidebar Overlay */}
                    {isSidebarOpen && (
                        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ width: '80%', maxWidth: '300px', backgroundColor: 'var(--surface)', height: '100%', padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h3 style={{ fontWeight: '800' }}>Filters</h3>
                                    <X size={24} onClick={() => setIsSidebarOpen(false)} style={{ cursor: 'pointer' }} />
                                </div>
                                <FilterContent onClose={() => setIsSidebarOpen(false)} />
                            </div>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div style={{ flex: 1 }}>
                        {error ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#ef4444' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Connection Error</h2>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{error}</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px dashed var(--border)' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>No Products Found</h2>
                                <p>Try adjusting your search or category filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 grid-cols-3">
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
