const Razorpay = require("razorpay");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;

    case "GET":
      res.json({ msg: "hello" });
  }
};

const createOrder = async (req, res) => {
  console.log("users IP", req.ip);
  try {
    var razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_PUBLIC_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = {
      amount: 5000, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    if (!order) return res.status(500).json({ err: "Some error occured" });

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
