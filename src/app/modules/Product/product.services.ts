import { TProduct } from "./product.interfaces";
import { Product } from "./product.model";

const createProduct = async (product: TProduct) => {
  const newProduct = await Product.create(product);
  return newProduct;
};

const toggleProductStatus = async (id: string) => {
  const product = await Product.isProductExists(id);
  const status = product?.status === "active" ? "blocked" : "active";

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  return updatedProduct;
};

const getProduct = async (id: string) => {
  const product = await Product.isProductExists(id);

  return product;
};

const getProducts = async () => {
  const products = await Product.find();

  return products;
};

const updateProduct = async (id: string, product: TProduct) => {
  // separate the password from the product object. We don't want to update the password here.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const updated = await Product.findByIdAndUpdate(id, product, { new: true });

  return updated;
};

const deleteProduct = async (id: string) => {
  const deleted = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return deleted;
};

const ProductServices = {
  createProduct,
  toggleProductStatus,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

export default ProductServices;
