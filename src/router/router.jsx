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
import PrivateRoute from "../routes/PrivateRoute";
import SendPercel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import ParcelDetailsCard from "../pages/Dashboard/ParcelsDetailsCard/ParcelDetailsCard";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcels from "../pages/Dashboard/TrackParcels/TrackParcels";
import BeARider from "../pages/BeARider/BeARider";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";


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
      },
      {
        path : "send-parcel",
        element: <PrivateRoute>
          <SendPercel></SendPercel>
        </PrivateRoute>,
        loader: ()=> fetch("./servicecenter.json")
      },
      {
        path: 'be-a-rider',
        element: <PrivateRoute>
          <BeARider></BeARider>
        </PrivateRoute>,
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
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path: "my-parcels",
        Component: MyParcels,
        
      },
      {
        path: "parcel-details/:id",
        Component: ParcelDetailsCard,
        loader: ({params}) => fetch(`http://localhost:3000/parcels/${params.id}`)
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path:'payment-history',
        Component: PaymentHistory,
      },
      {
        path: "tracking",
        Component: TrackParcels
      },
      {
        path : 'active-riders',
        Component: ActiveRiders
      },
      {
        path: 'pending-riders',
        Component: PendingRiders
      },
      {
         path: 'make-admin',
         Component: MakeAdmin

      }
    ]
  }
]);