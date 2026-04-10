import { Request, Response } from 'express'
import productModel from '../models/product.model'

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.fetchAll()
    res.status(200).json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const product = await productModel.fetchById(id)

    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const { productName, price } = req.body

    const newProduct = await productModel.add({
      productName,
      price: Number(price),
    })

    res.status(201).json(newProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { productName, price } = req.body

    const updatedProduct = await productModel.update(id, {
      productName,
      price: price !== undefined ? Number(price) : undefined,
    })

    res.status(200).json(updatedProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await productModel.remove(id)
    res.status(200).json({ message: 'Product deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
}