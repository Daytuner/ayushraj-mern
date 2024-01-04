import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'

const Footer = () => {
    // const style={
    //     "position": "absolute",
    //    " bottom": "0",
    //     "width": "100%",
    //     "height": "50px"
    // }
    const date = new Date()
    return (

        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>Proshop &copy; {date.getFullYear()}</p>
                    </Col>
                </Row>
            </Container>
        </footer>

    )
}

export default Footer