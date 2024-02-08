import React, { useState } from 'react'
import {Form,Buttom} from 'react-bootstrap'
import { useNavigate,useParams } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const {keyword:urlKeyword} =useParams()
    const [keyword,setKeyword]=useState(urlKeyword||'')

    const submitHandler =async(e)=>{
      e.preventDefault()
    }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
        type='text'
        onChange={(e)=>{setKeyword(e.target.value)}}
        value={keyword}
        placeholder='Search Products...' 
        className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Buttom type='submit' varient='outline-success'   className='p-2 mx-2'>   Search</Buttom>
    </Form>
  )
}

export default SearchBox