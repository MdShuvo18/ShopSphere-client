import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PrivateRoute from '../AuthProvider/PrivateRoute'
import Login from "../Login/Login";
import Register from "../Login/Register";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <PrivateRoute><Home></Home></PrivateRoute>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/signup',
        element:<Register></Register>
      }
      // {
      //   path:'/productsCount',
      //   element:<AllProducts></AllProducts>,
      //   loader:()=>fetch('http://localhost:5000/productsCount')
      // }
    ]
  },
]);

export default router  