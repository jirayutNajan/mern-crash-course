import Product from "../product/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); 
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log("error in fetching product", err);
    res.status(500).json({ succes: false, message: "server error" });
  }
}

export const createProduct = async (req, res) => {
  // res.send("sever is ready");
  const product = req.body;//user wil send this data AUTO CHANGE THIS TO JSON WITH EXPRESS.JSON() MIDDLEWARE
  
  if(!product.name || !product.price || !product.image){
    return res.status(400).json({ success:false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();// save to db
    res.status(201).json({ success: true, data: newProduct });
  } catch(err) {
    console.error("Error in create product", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;// ที่จะส่งไปแก้
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); //{new: true} will return updated object if false it will return old object
    res.status(200).json({ success: true, data: updatedProduct });
  } catch(err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch(err) {
    console.log("error in deleting product", err);
    res.status(404).json({ success: false, message: "Server Error" });
  }
}