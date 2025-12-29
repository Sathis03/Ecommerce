import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
            <CheckCircle size={80} style={{ color: '#16a34a', marginBottom: '2rem' }} />
            <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>Order Placed!</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Thank you for your purchase. Your order number is #ARC-{Math.floor(Math.random() * 900000 + 100000)}.
                We'll email you a confirmation with details and tracking info soon.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                    Continue Shopping
                </Link>
                <Link to="/" className="btn" style={{ padding: '1rem 2rem', border: '1px solid var(--border)' }}>
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
