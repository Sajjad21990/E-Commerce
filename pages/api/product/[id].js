import connectDB from "../../../helpers/connectDB";
import Products from "../../../models/productModels";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);

    if (!product)
      return res.status(400).json({ err: "Product does not exist" });

    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
