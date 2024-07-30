import cartModel from "../models/cart.model.js";
import { Router } from "express";
const router = Router();

//create new cart
router.post('/', async (req, res) => {
    try {
      const newCart = new cartModel(req.body);
      const savedCart = await newCart.save();
      console.log("saved cart",savedCart)
      res.status(201).json(savedCart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post('/getByEmail', async (req, res) => {
    try {
      const cart = await cartModel.find({ email: req.body.email });
      if (!cart) return res.status(404).json({ message: 'cart not found' });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a cart by user ID
  router.get('/:userId', async (req, res) => {
    try {
      const cart = await cartModel.findOne({ userId: req.params.userId });
      if (!cart) return res.status(404).json({ message: 'cart not found' });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Add an item to the cart
  router.put('/:userId', async (req, res) => {
    try {
      const cart = await cartModel.findOne({ userId: req.params.userId });
      if (!cart) return res.status(404).json({ message: 'cart not found' });
  
      const { productId, quantity } = req.body;
      const itemIndex = cart.items.findIndex(item => item.productId === productId);
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
  
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Remove an item from the cart
  router.delete('/:email/:productId', async (req, res) => {
    console.log(req.params,"gg")
    try {
      const cart = await cartModel.findOneAndDelete({ email: req.params.email,productId:req.params.productId});
      if (!cart) return res.status(404).json({ message: 'cart not found' });
  
      // cart = cart.filter(item => item.productId !== req.params.productId);
  
      // const updatedCart = await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  export default router;