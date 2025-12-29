import axios from 'axios';
import { ArrowLeft, RefreshCw, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const ServiceItem = ({ icon: Icon, title, desc }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Icon size={24} style={{ color: 'var(--secondary)', marginBottom: '0.25rem' }} />
        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)' }}>{title}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{desc}</div>
    </div>
);

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
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

    if (loading) return <div className="container" style={{ padding: '5rem 0' }}>Loading...</div>;

    if (!product) return (
        <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
            <h2>Product Not Found</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</button>
        </div>
    );

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    cursor: 'pointer'
                }}
            >
                <ArrowLeft size={20} /> Back to Products
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                {/* Product Image */}
                <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                </div>

                {/* Product Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {product.category || 'Category'}
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', lineHeight: '1.2' }}>{product.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>₹{(product.price || 0).toLocaleString('en-IN')}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <div style={{ color: '#fbbf24', display: 'flex' }}>
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} style={{ width: '18px', height: '18px', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', background: i < Math.floor(product.rating || 0) ? 'currentColor' : '#e2e8f0' }}></div>
                                ))}
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>({product.numReviews || 0} Reviews)</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        {product.description}
                    </p>

                    <button className="btn btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', width: 'fit-content' }} onClick={addToCartHandler}>
                        <ShoppingCart size={24} /> Add to Cart
                    </button>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <ServiceItem icon={ShieldCheck} title="Warranty" desc="2 Years Coverage" />
                        <ServiceItem icon={Truck} title="Fast Delivery" desc="Within 2-5 Days" />
                        <ServiceItem icon={RefreshCw} title="Returns" desc="30-Day Exchange" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
