
import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Form,Button,Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useDispatch,useSelector } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'
const Payment = () => {
    const [payment,setPayment] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
     
    const  cart = useSelector((state)=>state.cart)
    const {shippingAddress} = cart
   
    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])


    const submitHandler = async(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(payment))
        navigate('/order')
    }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3/>
        <h1>Payment  Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check
                 type='radio'
                 className='my-2'
                 label='PayPal or Credit Card'
                 id='PayPal'
                 name='paymentMethod'
                 value='PayPal'
                 checked
                 onChange={(e)=>setPayment(e.target.value)}></Form.Check>
                  </Col>
            </Form.Group>
            <Button variant='primary' type='submit'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default Payment