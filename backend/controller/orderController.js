import asyncHandler from '../middleware/asyncHandler.js'
import Order from'../models/orderModel.js'

// @dsce Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req,res,next)=>{
  const {
  OrderItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  taxPrice,
  itemsPrice,
  totalPrice
  } = req.body

  if(OrderItems && OrderItems.length===0){
    res.status(400)
    throw new Error('No Order Items');
  }else{
    const order =new Order({
      OrderItems:OrderItems.map((x)=>({
        ...x,
        product:x._id,
        _id:undefined
      })),
      user:req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @dsce Get logged in user order
// @route POST /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json(orders)
  })


// @dsce Get  order by id
// @route POST /api/orders/:id
// @access Private
const getOrderById= asyncHandler(async(req,res,next)=>{
    const order  = await Order.findById(req.params.id).populate(
      'user','name email'
    )
    if(order){
      res.status(200).json(order)
    }else{
      res.status(404)
      throw new Error('Order Not Found')
    }
  })



// @dsce Update Order To Paid
// @route Get /api/orders/:id/pay
// @access Private Admin
const updateOrderToPaid= asyncHandler(async(req,res,next)=>{
    res.send('update order to paid')
  })

// @dsce Update Order To Paid
// @route Get /api/orders/:id/pay
// @access Private Admin
const updateOrderToDelivered= asyncHandler(async(req,res,next)=>{
    res.send('update order to delevered')
  })

// @dsce Get All Orders
// @route Get /api/orders
// @access Private
const getOrders= asyncHandler(async(req,res,next)=>{
    res.send('get All Orders')
  })


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
}