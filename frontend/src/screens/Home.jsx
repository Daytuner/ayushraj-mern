
import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Product from '../components/Product'
import Loader from '../components/Loader.jsx'


const Home = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery()
    return (
        <>
            {isLoading ? (
             <Loader/>
            ) : isError ? (<div>{(isError?.data?.message||isError.error)}</div>) : (<>
                <h1>Products List</h1>
                <Row>
                    {products.map(products => (
                        <Col key={products._id} sm={12} lg={4} md={6} xl={3}>
                            <Product product={products} />
                        </Col>
                    ))}
                </Row></>)}
        </>
    )
}

export default Home