import React from 'react'
import {toast} from 'react-toastify'
import { useState,useEffect } from 'react'
import {Link, useLocation, useNavigate} from  'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import  {useDispatch,useSelector}  from  'react-redux'
import Loader from '../components/Loader'
import {setCredentials} from '../slices/authSlice.js'
import { useRegisterMutation } from '../slices/userApiSlice.js'

const RegisterScreen = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [register,{isLoading}] = useRegisterMutation()

    const {userInfo} = useSelector((state)=>state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect')||'/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect,navigate]);

    const submitHandler = async(e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Password do not match')
            return
        }else{
            try {
              const res = await register({name,email,password}).unwrap()
              console.log(res)
              dispatch(setCredentials({...res}))
              navigate(redirect)
              
            } catch (error) {
              toast.error(error?.data?.message||error.error)
            }
            
        }
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit = {submitHandler}>
        <Form.Group controlId='name' className='my-3'>
             <Form.Label>Name</Form.Label>
             <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
             ></Form.Control>
             </Form.Group>
           <Form.Group controlId='email' className='my-3'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
             ></Form.Control>
           </Form.Group>
           <Form.Group controlId='password' className='my-3'>
             <Form.Label>Password</Form.Label>
             <Form.Control
              type='password'
              placeholder='Set Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
             ></Form.Control>
           </Form.Group>

           <Form.Group controlId='confirmPassword' className='my-3'>
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control
              type='Password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
             ></Form.Control>
           </Form.Group>

           <Button
           disabled={isLoading}
            type='submit'
            variant='primary'
            className='mt-2'>Register</Button>
            {isLoading && <Loader/>}
        </Form>

        <Row className='py-3'>
            <Col>
             Already Have An Account? <Link to={redirect?`/login?redirect=${redirect}`:'/login'}> Login </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen