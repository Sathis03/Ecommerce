import axios from 'axios';
import { ArrowLeft, RefreshCw, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const ServiceItem = ({ icon: Icon, title, desc }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <Icon size={20} style={{ color: 'var(--secondary)', marginBottom: '0.25rem' }} />
        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>{title}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</div>
    </div>
);

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message || 'Failed to fetch product details');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        if (product) {
            dispatch(addToCart({ ...product, qty: 1 }));
            alert('Added to Cart!');
        }
    };

    if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading...</div>;

    if (error) return (
        <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
            <h2 style={{ color: '#ef4444', fontWeight: '800' }}>Connection Error</h2>
            <p style={{ color: 'var(--text-muted)' }}>{error}</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Shop</button>
        </div>
    );

    if (!product) return (
        <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
            <h2 style={{ fontWeight: '800' }}>Product Not Found</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</button>
        </div>
    );

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                }}
            >
                <ArrowLeft size={18} /> BACK
            </button>

            <div className="flex-stack" style={{ gap: '4rem' }}>
                {/* Product Image */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        overflow: 'hidden',
                        borderRadius: '1.5rem',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border)',
                        aspectRatio: '1/1',
                        backgroundColor: 'var(--surface)'
                    }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {product.category || 'Category'}
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: 'var(--primary)', lineHeight: '1.1' }}>
                        {product.name}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>
                            ₹{(product.price || 0).toLocaleString('en-IN')}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ color: '#fbbf24', display: 'flex', gap: '2px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} style={{
                                        width: '18px',
                                        height: '18px',
                                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                        background: i < Math.floor(product.rating || 0) ? 'currentColor' : '#e2e8f0'
                                    }}></div>
                                ))}
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                ({product.numReviews || 0} Reviews)
                            </span>
                        </div>
                    </div>

                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        {product.description}
                    </p>

                    <div style={{ marginTop: '1rem' }}>
                        <button
                            className="btn btn-accent"
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                width: innerWidth < 640 ? '100%' : 'fit-content',
                                borderRadius: '1rem'
                            }}
                            onClick={addToCartHandler}
                        >
                            <ShoppingCart size={22} /> Add to Cart
                        </button>
                    </div>

                    <div style={{
                        borderTop: '1px solid var(--border)',
                        paddingTop: '2rem',
                        marginTop: '1rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '1rem'
                    }}>
                        <ServiceItem icon={ShieldCheck} title="Warranty" desc="2 Years Coverage" />
                        <ServiceItem icon={Truck} title="Fast Delivery" desc="Free Shipping" />
                        <ServiceItem icon={RefreshCw} title="Returns" desc="30-Day Policy" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
