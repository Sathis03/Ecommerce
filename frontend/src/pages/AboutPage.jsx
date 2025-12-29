import { Award, Clock, ShieldCheck, Truck } from 'lucide-react';

const AboutPage = () => {
    return (
        <div style={{ paddingBottom: '5rem' }}>
            {/* Hero Section */}
            <div style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '4rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
                        Redefining <span style={{ color: 'var(--accent)' }}>Modern Living</span>
                    </h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: '#94a3b8' }}>
                        At Arc Store, we believe that your home should be a sanctuary. We curate the finest furniture and appliances to bring comfort, style, and innovation to your doorstep.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container" style={{ marginTop: '4rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--primary)' }}>Our Mission</h2>
                        <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Founded in 2024, Arc Store started with a simple idea: premium home essentials shouldn't be elusive.
                            We bridge the gap between high-end design and everyday functionality.
                        </p>
                        <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                            We are committed to sustainability, quality craftsmanship, and exceptional customer service.
                            Every piece in our collection is handpicked to ensure it meets our rigorous standards for durability and aesthetics.
                        </p>
                    </div>
                    <div style={{
                        backgroundColor: 'var(--surface)',
                        padding: '2rem',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <Stat number="5K+" label="Happy Customers" />
                            <Stat number="1000+" label="Premium Products" />
                            <Stat number="24/7" label="Support System" />
                            <Stat number="15+" label="Countries Served" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div style={{ backgroundColor: 'var(--surface)', marginTop: '5rem', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>Why Choose Arc Store?</h2>
                        <p style={{ color: 'var(--text-muted)' }}>We go the extra mile to ensure your satisfaction.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <Feature icon={Truck} title="Free Fast Shipping" desc="On all orders over ₹ 5000, delivered safely to your door." />
                        <Feature icon={ShieldCheck} title="2 Year Warranty" desc="We stand by the quality of our products with comprehensive coverage." />
                        <Feature icon={Clock} title="30-Day Returns" desc="Not in love? Return it within 30 days, no questions asked." />
                        <Feature icon={Award} title="Premium Quality" desc="Materials sourced from the finest suppliers available." />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Stat = ({ number, label }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent)' }}>{number}</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>{label}</div>
    </div>
);

const Feature = ({ icon: Icon, title, desc }) => (
    <div style={{
        padding: '2rem',
        backgroundColor: 'var(--background)',
        borderRadius: 'var(--radius)',
        textAlign: 'center',
        transition: 'var(--transition)'
    }}>
        <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
        }}>
            <Icon size={24} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{desc}</p>
    </div>
);

export default AboutPage;
