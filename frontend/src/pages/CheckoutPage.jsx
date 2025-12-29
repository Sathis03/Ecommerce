import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const Section = ({ title, children }) => (
    <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--primary)' }}>{title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {children}
        </div>
    </div>
);

const Input = ({ label, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>{label}</label>
        <input style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s'
        }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            {...props} />
    </div>
);

const RadioInput = ({ label, checked, ...props }) => (
    <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        padding: '0.75rem 1rem',
        border: `1px solid ${checked ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        backgroundColor: checked ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
        transition: 'all 0.2s'
    }}>
        <input type="radio" {...props} checked={checked} style={{ accentColor: 'var(--accent)' }} />
        <span style={{ fontSize: '0.95rem', fontWeight: checked ? '600' : '400' }}>{label}</span>
    </label>
);

const SummaryRow = ({ label, value, isFree }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
        <span>{label}</span>
        <span style={{ fontWeight: '500', color: isFree ? '#16a34a' : 'inherit' }}>
            {isFree ? 'FREE' : `₹${(value || 0).toLocaleString('en-IN')}`}
        </span>
    </div>
);

const CheckoutPage = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
        paymentMethod: 'UPI'
    });

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shippingPrice = itemsPrice > 5000 ? 0 : 500;
    const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const order = {
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            orderItems: cartItems.map(item => ({
                name: item.name,
                qty: 1,
                image: item.image,
                price: item.price,
                product: item._id
            })),
            shippingAddress: {
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
                country: formData.country,
            },
            paymentMethod: formData.paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        };

        try {
            await axios.post('/api/orders', order);
            dispatch(clearCart());
            navigate('/success');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
                <h2>Your cart is empty.</h2>
                <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Go to Shop</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--primary)' }}>Checkout</h1>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                {/* Left Side: Forms */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Section title="Contact Information">
                        <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                        <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
                    </Section>

                    <Section title="Shipping Address">
                        <Input label="Street Address" name="address" value={formData.address} onChange={handleChange} required />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                            <Input label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                        </div>
                        <Input label="Country" name="country" value={formData.country} onChange={handleChange} required readOnly />
                    </Section>

                    <Section title="Payment Method">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <RadioInput label="UPI / GPay" name="paymentMethod" value="UPI" checked={formData.paymentMethod === 'UPI'} onChange={handleChange} />
                            <RadioInput label="Cash on Delivery" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleChange} />
                        </div>
                    </Section>
                </div>

                {/* Right Side: Order Summary */}
                <div style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
                    <div style={{
                        backgroundColor: 'var(--surface)',
                        padding: '2rem',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                            {cartItems.map((item) => (
                                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                                    <span style={{ color: 'var(--text-main)' }}>{item.name} x 1</span>
                                    <span style={{ fontWeight: '600' }}>₹{item.price.toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <SummaryRow label="Items Total" value={itemsPrice} />
                            <SummaryRow label="Shipping" value={shippingPrice} isFree={shippingPrice === 0} />
                            <SummaryRow label="Tax (GST 18%)" value={taxPrice} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', marginTop: '0.5rem', color: 'var(--primary)' }}>
                                <span>Grand Total</span>
                                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <button className="btn btn-accent" style={{ width: '100%', padding: '1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
                            {loading ? 'Processing...' : 'Confirm & Place Order'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
