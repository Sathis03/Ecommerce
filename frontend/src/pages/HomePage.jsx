import { BedDouble, Briefcase, Refrigerator, Sofa } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const categories = [
        { name: 'Living Room', icon: Sofa, slug: 'living-room' },
        { name: 'Kitchen & Appliances', icon: Refrigerator, slug: 'kitchen' },
        { name: 'Bedroom', icon: BedDouble, slug: 'bedroom' },
        { name: 'Office', icon: Briefcase, slug: 'office' }
    ];

    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '4rem 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-10%',
                    width: '120%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em'
                    }}>
                        Elevate Your <span style={{ color: 'var(--accent)' }}>Living Space</span>
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                        color: 'rgba(255,255,255,0.7)',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.6
                    }}>
                        Discover our curated collection of premium furniture and home appliances designed for modern living.
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Link to="/products" className="btn btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.1rem', minWidth: '160px' }}>
                            Shop Now
                        </Link>
                        <a href="#categories" className="btn" style={{
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            padding: '1rem 2rem',
                            fontSize: '1.1rem',
                            minWidth: '160px'
                        }}>
                            View Collections
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section id="categories" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '800', marginBottom: '1rem' }}>Shop by Category</h2>
                        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto' }}></div>
                    </div>

                    <div className="grid grid-cols-2 grid-cols-4">
                        {categories.map((cat) => (
                            <Link to={`/products?category=${cat.slug}`} key={cat.name} style={{
                                backgroundColor: 'var(--surface)',
                                borderRadius: 'var(--radius)',
                                padding: '2rem 1.5rem',
                                boxShadow: 'var(--shadow-md)',
                                textAlign: 'center',
                                transition: 'var(--transition)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
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
                                    width: 'clamp(50px, 15vw, 70px)',
                                    height: 'clamp(50px, 15vw, 70px)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    color: 'var(--secondary)',
                                    borderRadius: '50%',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <cat.icon size={innerWidth < 640 ? 24 : 32} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: 1.2 }}>{cat.name}</h3>
                                <p className="hide-mobile" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Explore Collection &rarr;</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter/Promo Section */}
            <section style={{ backgroundColor: 'var(--background)', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        backgroundColor: 'var(--surface)',
                        padding: '3rem 2rem',
                        borderRadius: '1.5rem',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem' }}>New Arrivals Every Week</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                style={{
                                    flex: 1,
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)',
                                    outline: 'none',
                                    minWidth: '200px'
                                }}
                            />
                            <button className="btn btn-primary" style={{ width: 'innerWidth < 640 ? "100%" : "auto"' }}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
