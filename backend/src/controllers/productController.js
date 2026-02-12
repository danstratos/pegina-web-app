import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const { q = '', categoria = '', page = 1, limit = 8, includeEmpty = 'false' } = req.query;

  const filter = {
    ...(q
      ? {
          $or: [
            { nombre: { $regex: q, $options: 'i' } },
            { descripcion: { $regex: q, $options: 'i' } },
            { categoria: { $regex: q, $options: 'i' } }
          ]
        }
      : {}),
    ...(categoria ? { categoria } : {}),
    ...(includeEmpty === 'true' ? {} : { cantidad: { $gt: 0 } })
  };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit))
  });
};

export const getCategories = async (_req, res) => {
  const categories = await Product.distinct('categoria');
  res.json(categories);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
};
