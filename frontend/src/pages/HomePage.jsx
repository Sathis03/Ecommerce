import { BedDouble, Briefcase, Refrigerator, Sofa } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const categories = [
        { name: 'Living Room', icon: Sofa, slug: 'living-room' },
        { name: 'Kitchen Appliances', icon: Refrigerator, slug: 'kitchen' },
        { name: 'Bedroom', icon: BedDouble, slug: 'bedroom' },
        { name: 'Office', icon: Briefcase, slug: 'office' }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '5rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1
                    }}>
                        Elevate Your <span style={{ color: 'var(--accent)' }}>Living Space</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#94a3b8',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem'
                    }}>
                        Discover our curated collection of premium furniture and home appliances designed for modern living.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/products" className="btn btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                            Shop Now
                        </Link>
                        <a href="#categories" className="btn" style={{
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            padding: '1rem 2rem',
                            fontSize: '1.1rem'
                        }}>
                            View Collections
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section id="categories" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '3rem', textAlign: 'center' }}>Featured Categories</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}>
                        {categories.map((cat) => (
                            <Link to={`/products?category=${cat.slug}`} key={cat.name} style={{
                                backgroundColor: 'var(--surface)',
                                borderRadius: 'var(--radius)',
                                padding: '2rem',
                                boxShadow: 'var(--shadow-md)',
                                textAlign: 'center',
                                transition: 'var(--transition)',
                                cursor: 'pointer',
                                display: 'block',
                                border: '1px solid var(--border)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)', /* secondary light */
                                    color: 'var(--secondary)',
                                    borderRadius: '50%',
                                    margin: '0 auto 1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <cat.icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{cat.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Explore Collection &rarr;</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
