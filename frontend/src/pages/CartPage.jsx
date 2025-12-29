import { ShoppingBag, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../redux/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
                <ShoppingBag size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>Your Cart is Empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--primary)' }}>Shopping Cart</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Cart Items List */}
                <div style={{ flex: 2 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {cartItems.map((item) => (
                            <div key={item._id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                backgroundColor: 'var(--surface)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius)',
                                boxShadow: 'var(--shadow-sm)',
                                border: '1px solid var(--border)'
                            }}>
                                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.category}</p>
                                </div>

                                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>
                                    ₹{item.price.toLocaleString('en-IN')}
                                </div>

                                <button
                                    onClick={() => removeFromCartHandler(item._id)}
                                    style={{ color: '#ef4444', padding: '0.5rem', borderRadius: '50%', backgroundColor: '#fee2e2' }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        backgroundColor: 'var(--surface)',
                        padding: '2rem',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid var(--border)',
                        position: 'sticky',
                        top: '6rem'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                            <span>Shipping</span>
                            <span style={{ color: '#16a34a' }}>Free</span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 0' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: '800' }}>
                            <span>Total</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>

                        <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1rem', textAlign: 'center' }}>
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
