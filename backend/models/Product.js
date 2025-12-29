import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
}, { timestamps: true });

const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    image: { type: String, required: true },
    images: [String],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    specifications: { type: Map, of: String },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    warranty: { type: String }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
