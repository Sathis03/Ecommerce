import { BedDouble, Briefcase, Refrigerator, Sofa } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ icon: Icon, title, slug }) => (
    <Link to={`/products?category=${slug}`} className="product-card" style={{ padding: '2.5rem 1.5rem', textAlign: 'center', alignItems: 'center' }}>
        <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'var(--accent-soft)',
            color: 'var(--accent)',
            borderRadius: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
        }}>
            <Icon size={32} />
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Browse Collection</p>
    </Link>
);

const HomePage = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* High-End Hero Section with Background Image */}
            <section style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '10rem 0',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                minHeight: '80vh'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=100")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                    animation: 'slowZoom 20s infinite alternate'
                }}></div>
                <style>{`
                    @keyframes slowZoom {
                        from { transform: scale(1); }
                        to { transform: scale(1.15); }
                    }
                `}</style>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.7) 50%, transparent 100%)',
                    zIndex: 1
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '850px' }}>
                        <div className="animate-fade" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent)', fontWeight: '900', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.3rem', marginBottom: '2rem' }}>
                            <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)' }}></div>
                            Premium Catalog 2024
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(3.5rem, 12vw, 7rem)',
                            lineHeight: 0.9,
                            fontWeight: '900',
                            marginBottom: '2.5rem',
                            letterSpacing: '-0.05em',
                            color: 'white'
                        }}>
                            Redefining <br />
                            <span style={{
                                color: 'transparent',
                                WebkitTextStroke: '1px rgba(255,255,255,0.6)',
                                background: 'linear-gradient(to right, #6366f1, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text'
                            }}>Modern</span> Living
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: '4rem',
                            lineHeight: 1.6,
                            maxWidth: '650px',
                            fontWeight: '500'
                        }}>
                            Bespoke furniture and artisanal pieces designed to transform your daily ritual into an extraordinary experience.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <Link to="/products" className="btn btn-accent" style={{ padding: '1.25rem 3.5rem', fontSize: '1.1rem', borderRadius: '3rem', boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}>
                                Shop Collections
                            </Link>
                            <Link to="/about" className="btn" style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '1.25rem 3.5rem', fontSize: '1.1rem', borderRadius: '3rem', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                Our Story
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curated Categories */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Shop by Department</h2>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Explore our specialized collections for every corner of your home.</p>
                        </div>
                        <Link to="/products" style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '0.95rem', borderBottom: '2px solid var(--accent-soft)', paddingBottom: '0.25rem' }}>View All Products &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-2 grid-cols-4">
                        <CategoryCard icon={Sofa} title="Living Room" slug="living-room" />
                        <CategoryCard icon={Refrigerator} title="Kitchen" slug="kitchen" />
                        <CategoryCard icon={BedDouble} title="Bedroom" slug="bedroom" />
                        <CategoryCard icon={Briefcase} title="Office" slug="office" />
                    </div>
                </div>
            </section>

            {/* Newsletter Overlay */}
            <section style={{ padding: '6rem 0', backgroundColor: '#f9fafb' }}>
                <div className="container">
                    <div style={{
                        backgroundColor: 'var(--primary)',
                        padding: '4rem 3rem',
                        borderRadius: 'var(--radius-lg)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)' }}></div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join the Inner Circle</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', maxWidth: '500px' }}>Receive exclusive early access to New Arrivals and artisanal design tips. No spam, just beauty.</p>
                        <form style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="Email address"
                                style={{
                                    flex: 1,
                                    padding: '1rem 1.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    minWidth: '250px'
                                }}
                            />
                            <button className="btn btn-accent" style={{ width: 'innerWidth < 640 ? "100%" : "auto"', border: 'none' }}>Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
