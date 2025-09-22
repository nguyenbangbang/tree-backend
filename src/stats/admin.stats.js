const express = require("express");
const router = express.Router();
const Order = require("../orders/order.model");
const Tree = require("../trees/tree.model");

// GET /api/statistics — Admin dashboard stats
router.get("/", async (req, res) => {
  try {
    // 1. Tổng số đơn hàng
    const totalOrders = await Order.countDocuments();

    // 2. Tổng doanh thu
    const salesAggregate = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const totalSales = salesAggregate[0]?.totalSales || 0;

    // 3. Số lượng cây trending
    const trendingAggregate = await Tree.aggregate([
      { $match: { trending: true } },
      { $count: "count" },
    ]);
    const trendingTrees = trendingAggregate[0]?.count || 0;

    // 4. Tổng số cây
    const totalTrees = await Tree.countDocuments();

    // 5. Doanh thu theo tháng
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 6. Trả kết quả
    res.status(200).json({
      totalOrders,
      totalSales,
      trendingTrees,
      totalTrees,
      monthlySales,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thống kê admin:", error);
    res.status(500).json({ message: "Không thể lấy dữ liệu thống kê" });
  }
});

module.exports = router;
