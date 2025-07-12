import {
  createBrowserRouter,
} from "react-router";
import rootLayout from "../layouts/rootLayout";
import Home from "../pages/homePage/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login/Login";
import Register from "../pages/authentication/Reg/Register";
import ForgetPassword from "../pages/authentication/ForgetPass/ForgetPassword";
import Coverage from "../pages/Coverage/Coverage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: rootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: ()=> fetch("./servicecenter.json")
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "forget-password",
        Component: ForgetPassword
      }
    ]
  },
]);