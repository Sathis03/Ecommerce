import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';

dotenv.config();

const test = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        console.log('Connected!');
        const count = await Product.countDocuments();
        console.log('Product count:', count);
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

test();
