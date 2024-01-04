import React from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from  'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import {logout} from '../slices/authSlice'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const {cartItems} = useSelector((state)=>state.cart)
    const {userInfo} = useSelector((state)=>state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()
    const logOutHandler = async() =>{
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    console.log(cartItems)
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href='/'>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link >
                                    <FaShoppingCart /> Cart
                                    {
                                        cartItems.length>0&&(
                                            <Badge pill bg='success' style={{marginLeft:"5px"}}>
                                                {cartItems.reduce((a,c)=> a+c.qty,0)}
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo?(
                                <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logOutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ):(
                                <LinkContainer to='/login'>
                                <Nav.Link>
                                <FaUser /> Login
                               </Nav.Link>
                              </LinkContainer>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header