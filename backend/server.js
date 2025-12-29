import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';

console.log('Backend server starting...');
dotenv.config();

const app = express();
console.log('Environment variables loaded.');
const PORT = process.env.PORT || 5000;

// Middleware

// app.use(cors());

app.use(cors({
    origin: ['https://arc-ecommerce-two.vercel.app', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

const seedIfEmpty = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log('Database empty, seeding initial data...');
            const seederData = [
                { name: 'Modern Velvet Sofa', brand: 'Arc', price: 45999, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070', rating: 4.5, numReviews: 12, category: 'living-room', countInStock: 10, description: 'Experience the ultimate comfort with our Modern Velvet Sofa.' },
                { name: 'Minimalist Wood Coffee Table', brand: 'Arc', price: 12499, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1976', rating: 4.8, numReviews: 8, category: 'living-room', countInStock: 7, description: 'Solid oak coffee table with a natural finish.' },
                { name: 'Ergonomic Office Chair', brand: 'Arc', price: 15499, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=2070', rating: 4.2, numReviews: 25, category: 'office', countInStock: 5, description: 'Adjustable height and lumbar support.' },
                { name: 'Smart 4K TV 55"', brand: 'Arc', price: 42999, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=2070', rating: 4.6, numReviews: 40, category: 'kitchen', countInStock: 3, description: 'Smart TV with voice control.' },
                { name: 'Queen Size Bed Frame', brand: 'Arc', price: 28999, image: 'https://mysleepyhead.com/media/catalog/product/q/u/queen_size_wooden_bed_1.jpg?auto=webp&format=pjpg&fit=cover', rating: 4.9, numReviews: 15, category: 'bedroom', countInStock: 2, description: 'Sturdy wooden bed frame.' },
                { name: 'Blender 5000', brand: 'Arc', price: 4999, image: 'https://cdn.mos.cms.futurecdn.net/QLv3XtsoHVCnum3JdNXYqn.jpg', rating: 4.3, numReviews: 10, category: 'kitchen', countInStock: 15, description: 'Powerful blender for smoothies.' },
                { name: 'Ceramic Vase Set', brand: 'Arc', price: 2499, image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=1974', rating: 4.7, numReviews: 18, category: 'living-room', countInStock: 20, description: 'Handcrafted ceramic vase set.' },
                { name: 'Standing Desk', brand: 'Arc', price: 34999, image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=2070', rating: 4.8, numReviews: 32, category: 'office', countInStock: 8, description: 'Motorized heights for health-conscious professionals.' },
                { name: 'Premium King Mattress', brand: 'Arc', price: 35000, image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&q=80&w=2070', rating: 4.5, numReviews: 45, category: 'bedroom', countInStock: 4, description: 'Pressure relief with breathable materials.' },
                { name: 'Smart Refrigerator', brand: 'Arc', price: 89999, image: 'https://static.vecteezy.com/system/resources/thumbnails/049/191/363/small/a-futuristic-refrigerator-door-displays-holographic-icons-while-showcasing-fresh-produce-in-a-stylish-kitchen-the-environment-blends-innovation-with-culinary-freshness-photo.jpg', rating: 4.4, numReviews: 22, category: 'kitchen', countInStock: 1, description: 'Energy-saving futuristic refrigerator.' },
                { name: 'Bookshelf Unit', brand: 'Arc', price: 8999, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=2139', rating: 4.1, numReviews: 14, category: 'office', countInStock: 12, description: 'Spacious wooden bookshelf.' },
                { name: 'Luxury Table Lamp', brand: 'Arc', price: 3999, image: 'https://media.gettyimages.com/id/523721884/photo/french-neoclassical-formal-living-room.jpg?s=612x612&w=gi&k=20&c=_hUvh-EAcdpq_h2YK7juxxjBWIlCd8urPyYJYzqocsc=', rating: 4.6, numReviews: 30, category: 'bedroom', countInStock: 18, description: 'Warm glow neoclassical lamp.' }
            ];
            await Product.insertMany(seederData);
            console.log('Database seeded successfully!');
        }
    } catch (err) {
        console.error('Auto-seeding failed:', err.message);
    }
};

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce', {})
    .then(() => {
        console.log('MongoDB Connected');
        seedIfEmpty();
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        console.error('Make sure MongoDB is running locally on port 27017, or check your MONGO_URI in backend/.env');
    });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Helper Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
