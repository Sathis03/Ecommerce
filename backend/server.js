import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mock Data
const products = [
    { _id: '1', name: 'Modern Velvet Sofa', brand: 'Arc', price: 45999, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070', rating: 4.5, numReviews: 12, category: 'living-room', countInStock: 10, description: 'Experience the ultimate comfort with our Modern Velvet Sofa.' },
    { _id: '2', name: 'Minimalist Wood Coffee Table', brand: 'Arc', price: 12499, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1976', rating: 4.8, numReviews: 8, category: 'living-room', countInStock: 7, description: 'Solid oak coffee table with a natural finish.' },
    { _id: '3', name: 'Ergonomic Office Chair', brand: 'Arc', price: 15499, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=2070', rating: 4.2, numReviews: 25, category: 'office', countInStock: 5, description: 'Adjustable height and lumbar support.' },
    { _id: '4', name: 'Smart 4K TV 55"', brand: 'Arc', price: 42999, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=2070', rating: 4.6, numReviews: 40, category: 'kitchen', countInStock: 3, description: 'Smart TV with voice control.' },
    { _id: '5', name: 'Queen Size Bed Frame', brand: 'Arc', price: 28999, image: 'https://mysleepyhead.com/media/catalog/product/q/u/queen_size_wooden_bed_1.jpg?auto=webp&format=pjpg&fit=cover', rating: 4.9, numReviews: 15, category: 'bedroom', countInStock: 2, description: 'Sturdy wooden bed frame.' },
    { _id: '6', name: 'Blender 5000', brand: 'Arc', price: 4999, image: 'https://cdn.mos.cms.futurecdn.net/QLv3XtsoHVCnum3JdNXYqn.jpg', rating: 4.3, numReviews: 10, category: 'kitchen', countInStock: 15, description: 'Powerful blender for smoothies.' }
];

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.post('/api/orders', (req, res) => {
    console.log('Order received:', req.body);
    res.status(201).json({ message: 'Order created successfully (Mock)', order: req.body });
});

app.get('/', (req, res) => {
    res.send('API is running (Mock Mode)...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in mock mode (no database)`);
});
