import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {PayPalScriptProvider} from  '@paypal/react-paypal-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Error from './screens/Error';
import Home from './screens/Home';
import {HelmetProvider} from 'react-helmet-async'
import PDetail from './screens/PDetail';
import { Provider } from 'react-redux';
import store from './store.js';
import Cart from './screens/Cart.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import Shipping from './screens/Shipping.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Payment from './screens/Payment.jsx';
import PlaceOrder from './screens/PlaceOrder.jsx';
import Order from './screens/Order.jsx';
import Profile from './screens/Profile.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderList from './screens/admin/OrderList.jsx';
import ProductList from './screens/admin/ProductList.jsx';
import ProductEdit from './screens/admin/ProductEdit.jsx' ;
import UserEdit from './screens/admin/UserEdit.jsx';
import UserList from './screens/admin/UserList.jsx';

const router = createBrowserRouter( [
  {
    path: '/',
    element:  <App />,
    errorElement: <Error />,
    children: [
      {  index:true, path: '/', element: <Home/> },
      {  path: '/page/:pageNumber', element: <Home/> },
      { path:'/search/:keyword', element:<Home/>},
      {  path:'/search/:keyword/page/:pageNumber',
      element:<Home/>},
      {  path: '/products/:id', element: <PDetail/> },
      {  path:'/cart',element:<Cart/> },
      {  path: '/login',element:<LoginScreen/>},
      {  path: '/register',element:<RegisterScreen/>},
      {  path: '', 
         element:<PrivateRoute/> ,
         children:[
         {path: '/shipping',element:<Shipping/>},
         {path: '/payment',element:<Payment/>},
         {path: '/placeorder',element:<PlaceOrder/>},
         {path: '/order/:id',element:<Order/>},
         {path: '/profile',element:<Profile/>},
        ]
      },
      {path:"",element:<AdminRoute/>,children:[
        {path:'/admin/orderlist',element:<OrderList/>},
        {path:'/admin/productslist',element:<ProductList/>},
        {path:'/admin/productslist/:pageNumber',element:<ProductList/>},
        {path:'/admin/product/:id/edit',element:<ProductEdit/>},
        {path:'/admin/user/:id/edit' ,element:<UserEdit/>},
        {path:'/admin/userlist', element:<UserList />}

      ]}
    ]
  }
]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>

    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
    <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>

  </React.StrictMode>
);


reportWebVitals();
