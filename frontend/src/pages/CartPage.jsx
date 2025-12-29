import { ChevronRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
                <div style={{
                    backgroundColor: 'var(--accent-soft)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    color: 'var(--accent)'
                }}>
                    <ShoppingBag size={48} />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem' }}>Empty Sanctuary</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
                    Your cart is currently a blank canvas. Let's fill it with items that define your space.
                </p>
                <Link to="/products" className="btn btn-primary" style={{ padding: '1.25rem 3rem', borderRadius: '3rem' }}>
                    Start Curating
                </Link>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: 'var(--primary)' }}>Your Selection</h1>
                    <div style={{ padding: '0.4rem 1rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: '800' }}>
                        {cartItems.length} ITEMS
                    </div>
                </div>

                <div className="flex-stack" style={{ gap: '4rem', alignItems: 'flex-start' }}>
                    {/* Cart Items List */}
                    <div style={{ flex: '1 1 600px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.map((item) => (
                                <div key={item._id} className="product-card" style={{
                                    flexDirection: 'row',
                                    padding: '1.5rem',
                                    alignItems: 'center',
                                    gap: '2rem'
                                }}>
                                    <div style={{ width: '140px', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                            {item.category?.replace('-', ' ')}
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--primary)' }}>{item.name}</h3>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary)' }}>
                                            ₹{item.price.toLocaleString('en-IN')}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCartHandler(item._id)}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '50%',
                                            backgroundColor: '#fee2e2',
                                            color: '#ef4444',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'var(--transition)',
                                            display: 'flex'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div style={{ flex: '1 1 400px', position: 'sticky', top: '8rem' }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '3rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--border)'
                        }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '2rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>Summary</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontWeight: '600' }}>
                                    <span>Subtotal</span>
                                    <span style={{ color: 'var(--primary)' }}>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontWeight: '600' }}>
                                    <span>Shipping</span>
                                    <span style={{ color: 'var(--success)' }}>Gratis</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.5rem 0' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900' }}>
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="btn btn-accent"
                                style={{ width: '100%', padding: '1.25rem', marginTop: '3rem', borderRadius: '3rem', fontSize: '1.1rem' }}
                            >
                                Checkout <ChevronRight size={20} />
                            </button>

                            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                Taxes and shipping calculated at checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
