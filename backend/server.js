import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import path from "path";
import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050

const __dirname = path.resolve();

app.use(express.json());// middlewear auto json for req.body

app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.listen(PORT, () => {
  connectDB(); 
  console.log(`server running on http://localhost:${PORT}`);
});