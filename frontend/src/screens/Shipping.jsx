import React from 'react'
import { useState } from 'react'
import {Form,Button, FormGroup, FormControl} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../slices/cartSlice'
import CheckOutSteps from '../components/CheckOutSteps'


const Shipping = () => {
    
  const cart =  useSelector((state)=>state.cart)
  const {shippingAddress} = cart



  const [address,setAddress] = useState(shippingAddress?.address||'')
  const [city,setCity] = useState(shippingAddress?.city||'')
  const [postalCode,setPostalCode] = useState(shippingAddress?.postalCode||'')
  const [country,setCountry] = useState(shippingAddress?.country||'')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')
  }
  return (
    <FormContainer>
        <CheckOutSteps step1 step2 />
       <Form onSubmit={submitHandler}>
        <h1>
            Shipping
        </h1>
            <FormGroup>
                <Form.Label> Address </Form.Label>
                <FormControl
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e)=>setAddress(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup>
                <Form.Label> Postal Code </Form.Label>
                <FormControl
                type='text'
                placeholder='Enter Postal Code'
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup>
                <Form.Label> City </Form.Label>
                <FormControl
                type='text'
                placeholder='Enter City'
                value={city}
                onChange={(e)=>setCity(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup>
                <Form.Label> Country </Form.Label>
                <FormControl
                type='text'
                placeholder='Enter Country'
                value={country}
                onChange={(e)=>setCountry(e.target.value)}>
                </FormControl>
            </FormGroup>

            <Button
            type='submit'
            variant='primary'
            className='mt-2'>Continue</Button>
       </Form>
    </FormContainer>
  )
}

export default Shipping