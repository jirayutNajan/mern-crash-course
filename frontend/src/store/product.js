import { create } from "zustand"

// สร้าง global state(ตัวแปร) เพื่อจะให้ได้ import ได้จากทุกไฟล์ เพราะถ้าสร้าง จากไฟล์ app.jsx ต้องส่งเป็น props ไปเรื่อยๆ
export const useProductStore = create((set) => ({ //=> (return value) in this return object
  // set คือฟังก์ชันที่ให้มา เอาไว้ update state
  products: [], // <-- state
  setProducts: (products) => set({ products }), // setProducts คือฟังก์ชัน คล้ายๆกับใช้ state ปกติ
  createProduct: async (newProduct) => {
    if( !newProduct.name || !newProduct.price || !newProduct.image ) {
      return { success: false, message: "Please fill all  fields." }
    }
    const res = await fetch("/api/products ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
    const data = await res.json();
    set((state) => ({products: [...state.products, data.data]}))
    
    return { success: true, message: "Product created successfully"};
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();// { success: "", data:  }
    set({ products: data.data }) // set คือแก้ทั้งหมดใน useProductStore แต่อันนี้แก้แค่ Products
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if(!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    });

    const data = await res.json();// ถ้า success return success data: updated product
    if(!data.success) return { success: false, message: data.message };

    set((state) => ({ products: state.products.map((product) => (product._id === pid ? data.data : product)) }))
    return { success: true, message: "updated" };
  }
})); 