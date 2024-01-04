import express from 'express'
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
} from  '../controller/orderController.js'
import { admin,protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect,admin,getOrders).post(protect,addOrderItems)
router.route('/mine').get(protect,getMyOrders)
router.route('/:id').get(protect,admin,getOrderById)
router.route('/:id/pay').put(protect,admin,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)




export default router