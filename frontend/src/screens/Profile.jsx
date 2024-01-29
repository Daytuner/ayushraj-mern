import React from 'react'
import { useState,useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table,Form,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import {FaTimes} from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'

const Profile = () => {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const {userInfo} =  useSelector((state)=>state.auth)

    const {data:myOrders,isLoading,error}= useGetMyOrdersQuery()
    const [profile,{isLoading:loadingUpdateProfile}] = useProfileMutation()
    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
        }

    },[userInfo,userInfo.name,userInfo.email])


    const submitHandler=async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Password Do Not Match")
        }else{
            try {
                const res = await profile({_id:userInfo._id,email,name,password}).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Your  Credentials updated")
            } catch (error) {
                console.log(error?.data?.message||error.message)
            }
        }
    }



  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' onChange={(e)=>setName(e.target.value)} value={name}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='Email' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value={email}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} value={password}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmpassword' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}>
                    </Form.Control>
                </Form.Group>

                <Button  type='submit' variant='primary' className='my-3'>
                    Update
                </Button>
                {loadingUpdateProfile&& <Loader/>}

            </Form>
        </Col>
        <Col md={9}>
        <h2>My Orders</h2>
        {isLoading?(<Loader/>):error?(<Message varient='danger'>{error?.data?.message||error.message}</Message>):(
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>ORDER AT</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                    </tr>
                </thead>
                <tbody>
                    {myOrders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid?(order.paidAt?.substring(0,10)):(
                                <FaTimes style={{color:'red'}}/>
                            )}</td>
                            <td>{order.isDelivered?(order.deliveredAt.substring(0,10)):(
                                <FaTimes style={{color:'red'}}/>
                            )}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' varient='light'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </Col>
    </Row>
  )
}

export default Profile