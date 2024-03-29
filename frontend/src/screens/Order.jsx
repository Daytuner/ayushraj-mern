import {Link,useParams} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import  {useGetOrderDetailsQuery,usePayOrderMutation,useGetPayPalClientIdQuery} from  '../slices/orderApiSlice'
import { PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useEffect } from 'react'
import { useDeliverOrderMutation } from '../slices/orderApiSlice'

const Order = () => {
  const {id:orderId} = useParams()
  console.log(orderId)

  const [deliverOrder,{isLoading:deliverLoading}] = useDeliverOrderMutation()

  const {data:order,refetch,isLoading,error} = useGetOrderDetailsQuery(orderId)

  const [payOrder,{isLoading:loadingPay}] = usePayOrderMutation()

  const [{isPending},paypalDispatch]=usePayPalScriptReducer()

  const {data:paypal,isLoading:loadingPayPal,error:errorPayPal} = useGetPayPalClientIdQuery() 
  const {userInfo}= useSelector((state)=>state.auth)

  useEffect(()=>{

     if(!errorPayPal && !loadingPayPal && paypal.clientId){
        const loadPayPalScript = async()=>{
           paypalDispatch({
              type:'resetOptions',
              value:{
                 'client-id':paypal.clientId,
                 currency:'USD',
              }
           })
           paypalDispatch({type:'setLoadingStatus',value:'pending'})
        }
        if(order&&!order.isPaid){
         if(!window.paypal){
            loadPayPalScript();
         }
      }
     }

  },[order,paypal,paypalDispatch,loadingPayPal,errorPayPal])


  function onApprove(data,actions){
   return actions.order.capture().then(async function(details){
      try {
         await payOrder({orderId,details})
         refetch();
         toast.success("Payment Successful")
      } catch (error) {
         toast.error(error?.data?.message||error.message)
      }
   })
  }

//   async function onApproveTest(){
//    await payOrder({orderId,details:{payer:{"email_address":'asdas@asdf'}}})
//     refetch()
//     toast.success("Payment Successful")
//   } created for testing button

  function onError(error){
   toast.error(error.message)
  }

  function createOrder(data,actions){
   return actions.order.create({
      purchase_units:[
         {
            amount:{
               value:order.totalPrice,
               
            },
         },
      ],
   }).then((orderId)=> {
      return orderId
   })
  }

   async function deliverOrderHandler(e){
      e.preventDefault()
      try {
         await deliverOrder(orderId)
         refetch()
         toast.success('Order Delivered')
      } catch (error) {
         toast.error(error?.data?.message||error)
      }
   }

console.log(order)
    
  return  isLoading ? (<Loader/>) : error ? (<Message varient='danger'/>): (
     <>
        <h1>Order: {order._id}</h1>
        <Row>
         <Col md={8}>
            <ListGroup variant='flush'>
               <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                     <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                     <strong>Email: </strong>{order.user.email}
                  </p>
                  <p>
                     <strong>Shipping Address</strong>
                     {order.shippingAddress.address},{order.shippingAddress.city}{" "},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                  </p>
                  <p>
                     {order.isDelivered?(<Message varient="success">Delivered On {order.deliveredAt}</Message>):(<Message variant="danger">Not Delivered</Message>)}
                  </p>
               </ListGroup.Item>
               <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                     <strong>Method: </strong>
                     {order.paymentMethod} 
                  </p>
                  {order.isPaid?(<Message varient="success">Paid On {order.paidAt}</Message>):(<Message variant="danger">Not Delivered</Message>)}
               </ListGroup.Item>
               <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.map((item,index)=>(
                     <ListGroup.Item key={index}>
                        <Row>
                           <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded/>
                           </Col>
                           <Col>
                                <Link to={`/product/${item.product}`}/>
                                {item.name}
                           </Col>
                           <Col  md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                  ))}
               </ListGroup.Item>
            </ListGroup>
         </Col>
         <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                    <ListGroup.Item className='border-0' >
                        <h2>Order Summery</h2>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0' >
                        <Row>
                            <Col>
                             Items:
                            </Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
    
                    <ListGroup.Item>
                        <Row>
                            <Col>
                             Shipping:
                            </Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                             Tax:
                            </Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <Row>
                            <Col>
                             Total:
                            </Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                        {!order.isPaid&&(
                           <ListGroup.Item>
                              {loadingPay && <Loader/>}
                              {isPending?<Loader/>:(
                                 <div>
                                    {/* <Button onClick={onApproveTest} style={{marginBottom:'10px'}}>Test Button</Button> */}
                                    <div>
                                       <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} ></PayPalButtons>
                                    </div>
                                 </div>
                              )}
                           </ListGroup.Item>
                        )}
                        {deliverLoading && <Loader/>}
                        {userInfo && userInfo.isAdmin&& order.isPaid&&
                        !order.isDelivered&&(
                           <ListGroup.Item>
                              <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>Mark As Delivered</Button>
                           </ListGroup.Item>
                        )}

                    </ListGroup>
            </Card>
         </Col>
        </Row>
     </>
  )
}

export default Order