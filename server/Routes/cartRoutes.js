import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Product from "../Models/product.js";
import User from "../Models/user.js";
import Order from "../Models/order.js";
import Address from "../Models/Address.js";

const cartRoutes = Router();

cartRoutes.post("/addToCart", authenticate, async (req, res) => {
    const { prodId } = req.body; 
    const quantity = 1;  

    try {
        const product = await Product.findById(prodId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingProduct = user.shoppingCart.find(item => item.prodId == prodId);
        if (existingProduct) {
            existingProduct.quantity = quantity;
        } else {
            user.shoppingCart.push({ prodId, quantity });
        }

        if (product.stockQty < quantity) {
            return res.status(400).json({ error: 'Not enough stock available' });
        }
        product.stockQty -= quantity;

        await user.save();
        await product.save();

        res.json({ message: 'Product added to cart', shoppingCart: user.shoppingCart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

cartRoutes.get("/cart", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "shoppingCart.prodId",
            model: Product,
            select: "productName mrp discountedPrice productImage quantity"
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ shoppingCart: user.shoppingCart });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        res.status(500).json({ error: "Failed to retrieve cart" });
    }
});


cartRoutes.delete("/remove/:prodId", authenticate, async (req, res) => {
    const { prodId } = req.params;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const cartItemIndex = user.shoppingCart.findIndex(item => item.prodId == prodId);
        if (cartItemIndex === -1) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        const removedItem = user.shoppingCart[cartItemIndex];

        user.shoppingCart.splice(cartItemIndex, 1);

        const product = await Product.findById(prodId);
        if (product) {
            product.quantity += removedItem.quantity;
            await product.save();
        }

        await user.save();

        res.json({ message: "Product removed from cart", shoppingCart: user.shoppingCart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ error: "Failed to remove product from cart" });
    }
});



cartRoutes.post("/placeOrder", authenticate, async (req, res) => {
    const { addressId, paymentMethod } = req.body;
    
    if (!addressId || !paymentMethod) {
      return res.status(400).json({ error: "Address ID and payment method are required" });
    }
  
    try {
      const user = await User.findById(req.user._id).populate("shoppingCart.prodId");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (!user.shoppingCart.length) {
        return res.status(400).json({ error: "Cart is empty" });
      }
  
      const address = await Address.findById(addressId);
      if (!address) {
        return res.status(404).json({ error: "Address not found" });
      }
  
      const newOrder = new Order({
        userId: user._id,
        items: user.shoppingCart.map(({ prodId, quantity }) => ({
          productId: prodId._id,
          productName: prodId.productName,
          quantity,
          price: prodId.discountedPrice,
        })),
        totalAmount: user.shoppingCart.reduce((acc, { prodId, quantity }) => acc + prodId.discountedPrice * quantity, 0),
        address: {
          address_line: address.address_line,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },
        paymentMethod,
        orderStatus: "Pending",
        paymentStatus: "Pending",
      });
  
      await newOrder.save();
  
      user.shoppingCart = [];
      await user.save();
  
      res.json({ message: "Order placed successfully!", orderId: newOrder._id });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ error: "Failed to place order" });
    }
  });
  
export { cartRoutes };

