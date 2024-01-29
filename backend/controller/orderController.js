import asyncHandler from '../middleware/asyncHandler.js'
import Order from'../models/orderModel.js'

// @dsce Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req,res,next)=>{
  const {
  orderItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  taxPrice,
  itemsPrice,
  totalPrice
  } = req.body

  if(orderItems && orderItems.length===0){
    res.status(400)
    throw new Error('No Order Items');
  }else{
    const order =new Order({
      orderItems:orderItems.map((x)=>({
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
// @route Put /api/orders/:id/pay
// @access Private 
const updateOrderToPaid= asyncHandler(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(order){
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        // email_address:res.body.email_address,
      }

      const updateOrder = await order.save()
      res.status(200).json(updateOrder)
    }else{
      res.status(404)
      throw new Error('No Order Found')
    }
  })

// @dsce Update Order To Paid
// @route Put /api/orders/:id/pay
// @access Private Admin
const updateOrderToDelivered= asyncHandler(async(req,res,next)=>{
  const order  = await Order.findById(req.params.id)
  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now()
    const updateOrder = await order.save()
    res.status(200).json(updateOrder)
  }
  else{
    res.status(404)
    throw new Error('No Order Found')
  }
  })

// @dsce Get All Orders
// @route Get /api/orders
// @access Private
const getOrders= asyncHandler(async(req,res,next)=>{
  const orders = await Order.find({}).populate('user','id name')
    res.status(200).json(orders)
  })


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
}