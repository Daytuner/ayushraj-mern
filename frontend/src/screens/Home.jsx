
import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productApiSlice'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader.jsx'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Message from '../components/Message';
import { Link } from 'react-router-dom';


const Home = () => {
    const { pageNumber, keyword } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({
      keyword,
      pageNumber,
    });
  
    return (
      <>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to='/' className='btn btn-light mb-4'>
            Go Back
          </Link>
        )}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Meta title='Hello' />
            <h1>Latest Products</h1>
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </>
    );
}

export default Home