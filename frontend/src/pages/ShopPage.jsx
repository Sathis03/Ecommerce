import axios from 'axios';
import { Filter, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const Label = ({ text, active, slug, navigate }) => (
    <div
        onClick={() => {
            if (slug) {
                navigate(`/products?category=${slug}`);
            } else {
                navigate('/products');
            }
        }}
        style={{
            cursor: 'pointer',
            color: active ? 'var(--accent)' : 'var(--text-main)',
            fontWeight: active ? '600' : '400',
            transition: 'color 0.2s'
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
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', lineHeight: '1.4' }}>{product.name}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} />
                        ))}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({product.numReviews})</span>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        onClick={addToCartHandler}
                    >
                        Add to Cart
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

    if (loading) return <div className="container" style={{ padding: '5rem 0' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ display: 'flex', gap: '3rem', flexDirection: 'column' }}>

                {/* Header / Title */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>
                        {keyword ? `Search Results for "${keyword}"` : selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')} Collection` : 'All Products'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Found {products.length} items</p>
                </div>

                {/* Main Content Layout (Sidebar + Grid) */}
                <div style={{ display: 'flex', gap: '3rem' }}>

                    {/* Sidebar Filters */}
                    <div style={{ flex: '0 0 250px' }}>
                        <div style={{ position: 'sticky', top: '6rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: '700', fontSize: '1.1rem' }}>
                                <Filter size={20} /> Filters
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem' }}>Category</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <Label text="All Products" active={!selectedCategory} navigate={navigate} />
                                    <Label text="Living Room" active={selectedCategory === 'living-room'} slug="living-room" navigate={navigate} />
                                    <Label text="Kitchen & Appliances" active={selectedCategory === 'kitchen'} slug="kitchen" navigate={navigate} />
                                    <Label text="Bedroom" active={selectedCategory === 'bedroom'} slug="bedroom" navigate={navigate} />
                                    <Label text="Office" active={selectedCategory === 'office'} slug="office" navigate={navigate} />
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem' }}>Price Range</h3>
                                <input type="range" style={{ width: '100%' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                    <span>₹0</span>
                                    <span>₹1,00,000+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div style={{ flex: 1 }}>
                        {error ? (
                            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#ef4444' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Connection Error</h2>
                                <p>{error}</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                                    API URL: {axios.defaults.baseURL}<br />
                                    Make sure your backend is running and CORS is configured.
                                </p>
                            </div>
                        ) : products.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>No Products Found</h2>
                                <p>Try checking your database connection or running the seeder.</p>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '2rem'
                            }}>
                                {(products || []).map(product => (
                                    product && product._id ? <ProductCard key={product._id} product={product} /> : null
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
