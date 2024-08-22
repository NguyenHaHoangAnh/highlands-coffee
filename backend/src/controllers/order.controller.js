const Order = require('../models/order.model');
const Area = require('../models/area.model');
const Shop = require('../models/shop.model');
const User = require('../models/user.model');
const pagination = require('../middlewares/pagination');

const orderController = {

    // [POST] /order/create
    async create(req, res) {
        const newOrder = new Order(req.body);
        await newOrder.save()
            .then(() => res.status(200).json({ data: newOrder, message: 'Tạo đơn hàng mới thành công' }))
            .catch((error) => res.status(400).json({ error }));
    },

    // [POST] /order/getById
    async getById(req, res) {
        try {
            const order = await Order.findById(req.body.id);
            const area = await Area.findById(order.user.area._id);
            order.user.area.name = area.name;
            const shop = await Shop.findById(order.user.shop._id);
            order.user.shop.name = shop.name;

            return res.status(200).json({ data: order, message: 'Lấy thông tin Đơn hàng thành công' })
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    // [GET] /order/pending
    async getPendingOrder(req, res) {
        try {
            const user = await User.findById(req.cookies.id);
            const orders = await Order.find({ 'user.shop._id': user.work_place._id, 'status': 'pending' });
            if (!orders) 
                return res.status(400).json({ error: 'Không tìm thấy Đơn hàng' });
            
            if (orders.length === 0) 
                return res.status(200).json({ error: 'Không tìm thấy Đơn hàng' });

            // Check if url not has query => return all
            if (!req.query.page && !req.query.perPage)
                return res.status(200).json({ data: orders, message: 'Lấy thông đơn hàng thành công' });

            const data = pagination.getPaginatedData(req, res, orders.reverse());
            const pageCount = pagination.getPageCount(req, res, orders);

            return res.status(200).json({ data, pageCount, message: 'Lấy thông đơn hàng thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    
    // [GET] /order/success
    async getSuccessOrder(req, res) {
        try {
            const user = await User.findById(req.cookies.id);
            const orders = await Order.find({ 'user.shop._id': user.work_place._id, 'status': 'success' });
            if (!orders) 
                return res.status(400).json({ error: 'Không tìm thấy Đơn hàng' });
            
            if (orders.length === 0) 
                return res.status(200).json({ data: [], message: 'Không tìm thấy Đơn hàng' });

            // Check if url not has query => return all
            if (!req.query.page && !req.query.perPage)
                return res.status(200).json({ data: orders, message: 'Lấy thông đơn hàng thành công' });

            const data = pagination.getPaginatedData(req, res, orders.reverse());
            const pageCount = pagination.getPageCount(req, res, orders);

            return res.status(200).json({ data, pageCount, message: 'Lấy thông đơn hàng thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    
    // [GET] /order/cancel
    async getCancelOrder(req, res) {
        try {
            const user = await User.findById(req.cookies.id);
            const orders = await Order.find({ 'user.shop._id': user.work_place._id, 'status': 'cancel' });
            if (!orders) 
                return res.status(400).json({ error: 'Không tìm thấy Đơn hàng' });
            
            if (orders.length === 0) 
                return res.status(200).json({ data: [], message: 'Không tìm thấy Đơn hàng' });

            // Check if url not has query => return all
            if (!req.query.page && !req.query.perPage)
                return res.status(200).json({ data: orders, message: 'Lấy thông đơn hàng thành công' });

            const data = pagination.getPaginatedData(req, res, orders.reverse());
            const pageCount = pagination.getPageCount(req, res, orders);

            return res.status(200).json({ data, pageCount, message: 'Lấy thông đơn hàng thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    // [PUT] /order/update/:id
    async update(req, res) {
        try {
            await Order.updateOne({ _id: req.params.id }, req.body);
            return res.status(200).json({ data: req.body, message: 'Cập nhật Đơn hàng thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

}

module.exports = orderController