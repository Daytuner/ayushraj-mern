import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import{useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation} from '../../slices/productApiSlice'
import {FaTimes,FaEdit,FaTrash} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'


const ProductList = () => {
    const pageNumber = useParams()
    const { data, isLoading, isError,refetch} = useGetProductsQuery(pageNumber)
    const [createProduct,{isLoaing:createLoader}]= useCreateProductMutation()
    const  createProductHandler = async()=>{
        if( window.confirm("are you sure u want to create another product")){
            try {
                await createProduct()
                refetch()
            } catch (error) {
                console.log(error?.data?.message||error)
            }
        }
    }
    const[deleteProduct,{isLoading:deleteLoading}] = useDeleteProductMutation()
    const deleteHandler = async(id)=>{
        if(window.confirm("Are you sure you want to delete product?")){
            try {
                await deleteProduct(id)
                refetch()
                toast.success("Product deleted")
            } catch (error) {
                toast.error(error?.data?.message||error)
            }
        }
    }
  return (
    <>
    <Row>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col>
        <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit/> Create Product
        </Button>
        </Col>
    </Row>
    {createLoader&&(<Loader/>)}
    {deleteLoading&&(<Loader/>)}
    {isLoading ? (
             <Loader/>
            ) : isError ? (<Message>{(isError?.data?.message||isError.error)}</Message>) : (<>
<Table straped  hover responsive classname='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>\
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button className='btn-sm mx-2'>
                                        <FaEdit/>
                                    </Button>
                                </LinkContainer>
                                <Button varient='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
                                        <FaTrash/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
      </Table>
      <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
                </>)}
    </>
  )
}

export default ProductList