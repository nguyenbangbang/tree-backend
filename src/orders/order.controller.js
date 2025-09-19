const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    console.log(" Dữ liệu nhận được từ frontend:", req.body);
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng nào cho email này" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng", error);
    res.status(500).json({ message: "Lỗi server khi lấy đơn hàng" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
};
