import axios from 'axios';
import { ArrowLeft, RefreshCw, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const ServiceIcon = ({ icon: Icon, title, desc }) => (
    <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--accent-soft)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '50%', color: 'var(--accent)', display: 'flex' }}>
            <Icon size={20} />
        </div>
        <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary)' }}>{title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>{desc}</div>
        </div>
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
            } catch (err) {
                setError('Failed to load product details.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        if (product) {
            dispatch(addToCart({ ...product, qty: 1 }));
            // Add toast notification logic if available
        }
    };

    if (loading) return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--accent-soft)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error || !product) return (
        <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{error || 'Product Not Found'}</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">Back to Collection</button>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: '3rem 0' }}>
            <div className="container">
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        marginBottom: '3rem',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}
                >
                    <ArrowLeft size={18} /> Back to Products
                </button>

                <div className="flex-stack" style={{ gap: '5rem' }}>
                    {/* Visual Stage */}
                    <div style={{ flex: '1 1 500px' }}>
                        <div style={{
                            position: 'relative',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-lg)',
                            backgroundColor: 'white',
                            border: '1px solid var(--border)'
                        }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '700px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Content Stage */}
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                                <div style={{ width: '20px', height: '2px', backgroundColor: 'var(--accent)' }}></div>
                                {product.category?.replace('-', ' ')}
                            </div>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem' }}>{product.name}</h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>₹{product.price.toLocaleString('en-IN')}</div>
                                <div style={{ height: '30px', width: '1px', backgroundColor: 'var(--border)' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Star size={18} fill="#fbbf24" color="#fbbf24" />
                                    <span style={{ fontWeight: '800' }}>{product.rating}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({product.numReviews} Reviews)</span>
                                </div>
                            </div>
                        </div>

                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            {product.description}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                            <button
                                onClick={addToCartHandler}
                                className="btn btn-primary"
                                style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', borderRadius: '3rem', flex: 1, minWidth: '200px' }}
                            >
                                <ShoppingBag size={22} /> Add to Cart
                            </button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem',
                            marginTop: '2rem'
                        }}>
                            <ServiceIcon icon={ShieldCheck} title="Authentic" desc="2 Years Brand Warranty" />
                            <ServiceIcon icon={Truck} title="Free Delivery" desc="Estimated 2-3 Days" />
                            <ServiceIcon icon={RefreshCw} title="Easy Returns" desc="30-Day Policy" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
