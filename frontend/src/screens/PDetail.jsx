import {React, useState} from 'react'
import { useParams,Link,useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { Row,Col,Card,ListGroup,Button,Image, ListGroupItem,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import { addToCart } from '../slices/cartSlice'

const PDetail = () => {
  const{id: productId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [qty,setQty] = useState(1)
  const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId)
  const addToCartHandler =()=>{
      dispatch(addToCart({...product,qty}))
      navigate('/cart')
  }
   
  return (
    <>
    {isLoading?(<Loader/>):isError?(<div>{isError?.data?.message||isError.error} </div>):
    <>
    <Link className='btn btn-light my-3'  to='/'>Go Back</Link>
    <Row>
    <Col md={5}>
      <Image src={product.image} alt={product.name} fluid/>
    </Col>
    <Col md={4}>    
         <ListGroup varient='flush'  style={{border:'1px solid gray'}} >
             <ListGroupItem style={{marginBottom:'1rem',border:'0px'}} >
               <h3>{product.name}</h3>
             </ListGroupItem>
             <ListGroupItem style={{marginBottom:'1rem',border:'0px'}}>
             <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
             </ListGroupItem>
             <ListGroupItem style={{marginBottom:'1rem',border:'0px'}}>
             {`Price $${product.price}`}
             </ListGroupItem>
             <ListGroupItem style={{marginBottom:'1rem',border:'0px'}}>
                 {product.description}
             </ListGroupItem>
         </ListGroup>
    </Col>
    <Col md={3}>
     <Card>
         <ListGroup varient='flush'>
             <ListGroupItem>
                 <Row>
                 <Col> Price:</Col>
                 <Col>
                     {`$${product.price}`}
                 </Col>
                 </Row>
             </ListGroupItem>
             <ListGroupItem>
                 <Row>
                 <Col> Status:</Col>
                 <Col>
                     <strong>
                     {product.countInStock>0?'In Stock':'Out Of Stock'}
                     </strong>
                 </Col>
                 </Row>
             </ListGroupItem>
             {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                  <Form.Control
                  as='select'
                  value = {qty}
                  onChange={(e)=>setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x)=>(
                      <option key={x+1} value={x+1}>
                        {x+1}
                      </option>
                    ))}
                  </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
             )}
             <ListGroupItem>
                <Button variant="outline-secondary" type='button' disabled={product.countInStock===0} onClick={addToCartHandler}>Add To Cart</Button>
             </ListGroupItem>
           
         </ListGroup>

     </Card>
    </Col>
 </Row>
 </>
  }
    </>
  )
}

export default PDetail