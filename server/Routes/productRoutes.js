import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import upload from "../Middleware/upload.js";
import Product from "../Models/product.js";

const productRoutes = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

productRoutes.post("/addProducts", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
        try {
          const { ProductName, ProdId, CategoryName, Brand, DietaryType, Mrp, DiscountPercent, Weight, StockQty } = req.body;

          const existingProduct = await Product.findOne({ prodId : ProdId });
          if (existingProduct) {
            return res.status(400).json({ message: "Product already exists!" });
          }
      
          let imageBase64 = null;
          if (req.file) {
            imageBase64 = convertToBase64(req.file.buffer);
          }
      
          const discountedPrice = Mrp - (Mrp * DiscountPercent) / 100;
      
          const newProduct = new Product({
            productName :ProductName,
            prodId :ProdId, 
            categoryName:CategoryName,
            brand : Brand,
            dietaryType:DietaryType,
            mrp:Mrp,
            discountPercent:DiscountPercent,
            discountedPrice,
            weight:Weight,
            stockQty:StockQty,
            productImage: imageBase64,
          });
      
          await newProduct.save();
          res.status(201).json({ message: "Product added successfully!" });
      
        } catch (error) {
          console.error("Error adding product:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }}
);



productRoutes.get("/product/:prodId", authenticate, async (req, res) => {
  try {
      const { prodId } = req.params;
      const product = await Product.findOne({ prodId });

      if (!product) {
          return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json(product);
  } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// productRoutes.put("/productupdate/:prodId", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
//   try {
//       const { prodId } = req.params;
//       const { ProductName, CategoryName, Brand, DietaryType, Mrp, DiscountPercent, Weight, StockQty } = req.body;

//       let updatedFields = {
//           productName: ProductName,
//           categoryName: CategoryName,
//           brand: Brand,
//           dietaryType: DietaryType,
//           mrp: Mrp,
//           discountPercent: DiscountPercent,
//           discountedPrice: parseFloat((Mrp - (Mrp * DiscountPercent / 100)).toFixed(2)),
//           weight: Weight,
//           stockQty: StockQty
//       };

//       // If a new image is uploaded, update productImage
//       if (req.file) {
//           updatedFields.productImage = convertToBase64(req.file.buffer);
//       }

//       const updatedProduct = await Product.findOneAndUpdate({ prodId }, updatedFields, { new: true });

//       if (!updatedProduct) {
//           return res.status(404).json({ message: "Product not found!" });
//       }

//       res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
//   } catch (error) {
//       console.error("Error updating product:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// });




// // Multer Storage Configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

productRoutes.put(
  "/productupdate/:prodId",
  authenticate,
  adminCheck,
  upload.single("productImage"),
  async (req, res) => {
    try {
      const { prodId } = req.params;
      const {
        productName,
        categoryName,
        brand,
        dietaryType,
        mrp,
        discountPercent,
        weight,
        stockQty,
      } = req.body;

      let updateFields = {
        productName,
        categoryName,
        brand,
        dietaryType,
        mrp: parseFloat(mrp),
        discountPercent: parseFloat(discountPercent),
        discountedPrice: parseFloat((mrp - (mrp * discountPercent) / 100).toFixed(2)),
        weight,
        stockQty: parseInt(stockQty),
      };

      // If a new image is uploaded, update productImage
      if (req.file) {
        const imageBase64 = req.file.buffer.toString("base64");
        updateFields.productImage = `data:${req.file.mimetype};base64,${imageBase64}`;
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { prodId }, 
        { $set: updateFields }, 
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);



// Delete Product
productRoutes.delete('/deleteProduct/:prodId', authenticate, adminCheck, async (req, res) => {
  try {
    const {prodId } = req.params;
    const product = await Product.findOneAndDelete({ prodId });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Get All Products
productRoutes.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products.length) {
      return res.status(404).json({ message: "No products available" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});










productRoutes.get('/searchProduct', async (req, res) => {
  try {
      const { searchValue } = req.body;

      if (!searchValue) {
          return res.status(400).json({ message: "Search value is required" });
      }

      const products = await Product.find({
          $or: [
              { name: { $regex: searchValue, $options: "i" } },
              { category: { $regex: searchValue, $options: "i" } },
              { brand: { $regex: searchValue, $options: "i" } }
          ]
      });

      if (products.length === 0) {
          return res.status(404).json({ message: "No products found matching your search" });
      }

      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

export { productRoutes }
