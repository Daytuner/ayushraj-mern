import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Error from './screens/Error';
import Home from './screens/Home';
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

const router = createBrowserRouter( [
  {
    path: '/',
    element:  <App />,
    errorElement: <Error />,
    children: [
      {  index:true, path: '/', element: <Home/> },
      {  path: '/products/:id', element: <PDetail/> },
      {  path:'/cart',element:<Cart/> },
      {  path: '/login',element:<LoginScreen/>},
      {  path: '/register',element:<RegisterScreen/>},
      {  path: '', 
         element:<PrivateRoute/> ,
         children:[
         {path: '/shipping',element:<Shipping/>},
         {path: '/payment',element:<Payment/>},
         {path: '/order',element:<PlaceOrder/>}
        ]
      }
    ]
  }
]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
