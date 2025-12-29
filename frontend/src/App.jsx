import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShopPage from './pages/ShopPage';
import SuccessPage from './pages/SuccessPage';

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/success" element={<SuccessPage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </main>
                <footer style={{
                    marginTop: 'auto',
                    padding: '2rem 0',
                    textAlign: 'center',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <div className="container">
                        &copy; {new Date().getFullYear()} Arc Store. All rights reserved.
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
