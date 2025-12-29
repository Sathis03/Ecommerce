import axios from 'axios';
import { ChevronRight, CreditCard, MapPin, Truck, User } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const Section = ({ icon: Icon, title, children }) => (
    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)', padding: '0.6rem', borderRadius: '0.75rem' }}>
                <Icon size={20} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary)' }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {children}
        </div>
    </div>
);

const Input = ({ label, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
        <input style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--border)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            fontWeight: '500',
            outline: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 4px var(--accent-soft)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
            {...props} />
    </div>
);

const RadioInput = ({ label, checked, ...props }) => (
    <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        cursor: 'pointer',
        padding: '1.25rem',
        border: `2px solid ${checked ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        backgroundColor: checked ? 'var(--accent-soft)' : 'white',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        flex: 1
    }}>
        <input type="radio" {...props} checked={checked} style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }} />
        <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary)' }}>{label}</span>
    </label>
);

const CheckoutPage = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'India', paymentMethod: 'UPI'
    });

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shippingPrice = itemsPrice > 5000 ? 0 : 500;
    const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/orders', {
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                orderItems: cartItems.map(item => ({ ...item, product: item._id })),
                shippingAddress: { address: formData.address, city: formData.city, postalCode: formData.postalCode, country: formData.country },
                paymentMethod: formData.paymentMethod,
                itemsPrice, taxPrice, shippingPrice, totalPrice,
            });
            dispatch(clearCart());
            navigate('/success');
        } catch (error) {
            alert('Failed to place order.');
        } finally { setLoading(false); }
    };

    if (cartItems.length === 0) return null;

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '6rem 0' }}>
            <div className="container">
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '4rem', letterSpacing: '-0.04em' }}>Finalizing <span style={{ color: 'var(--accent)' }}>Order</span></h1>

                <form onSubmit={handleSubmit} className="flex-stack" style={{ gap: '4rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <Section icon={User} title="Who's this for?">
                            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                                <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 99999 99999" />
                            </div>
                        </Section>

                        <Section icon={MapPin} title="Where should we send it?">
                            <Input label="Street Address" name="address" value={formData.address} onChange={handleChange} required placeholder="House No, Building Name" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <Input label="City" name="city" value={formData.city} onChange={handleChange} required placeholder="Mumbai" />
                                <Input label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} required placeholder="400001" />
                            </div>
                        </Section>

                        <Section icon={CreditCard} title="Payment Method">
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                <RadioInput label="UPI / GPay" name="paymentMethod" value="UPI" checked={formData.paymentMethod === 'UPI'} onChange={handleChange} />
                                <RadioInput label="Cash on Delivery" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleChange} />
                            </div>
                        </Section>
                    </div>

                    <div style={{ flex: '1 1 400px', position: 'sticky', top: '8rem' }}>
                        <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Order Summary</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, fontWeight: '600' }}>
                                    <span>Items Total</span>
                                    <span>₹{itemsPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, fontWeight: '600' }}>
                                    <span>Shipping</span>
                                    <span>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, fontWeight: '600' }}>
                                    <span>GST (18%)</span>
                                    <span>₹{taxPrice.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div style={{ borderTop: '2px solid rgba(255,255,255,0.2)', paddingTop: '2rem', marginBottom: '3rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2.2rem', fontWeight: '900' }}>
                                    <span>Total</span>
                                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <button className="btn btn-accent" style={{ width: '100%', padding: '1.25rem', borderRadius: '3rem', fontSize: '1.1rem', gap: '1rem' }} disabled={loading}>
                                {loading ? 'Processing...' : (
                                    <>Place Secure Order <ChevronRight size={22} /></>
                                )}
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem', opacity: 0.4, fontSize: '0.8rem' }}>
                                <Truck size={16} /> Fast, Secure & Encrpyted Delivery
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
