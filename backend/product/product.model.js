import mongoose from "mongoose";

// auto connect to mongoose connect in db.js
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  image: {
    type: String,
    require: true
  },
}, {
  timestamps: true
}
);

const Product = mongoose.model('Product', productSchema);

export default Product;