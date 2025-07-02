import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRouter from "../routes/PrivetRouter";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/DashBoard/TrackParcel/TrackParcel";
import BeARider from "../pages/DashBoard/BeARider/BeARider";
import PendingRiders from "../pages/DashBoard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/DashBoard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/DashBoard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/DashBoard/AssignRider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/DashBoard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../pages/DashBoard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../pages/DashBoard/MyEarnings/MyEarnings";
import DashboardHome from "../pages/DashBoard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("./serviceCenter.json"),
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "beARider",
        element: (
          <PrivateRouter>
            <BeARider></BeARider>
          </PrivateRouter>
        ),
        loader: () => fetch("./serviceCenter.json"),
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRouter>
            <SendParcel></SendParcel>
          </PrivateRouter>
        ),
        loader: () => fetch("./serviceCenter.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      // rider only routes
      {
        path: "pending-deliveries",
        element: (
          <RiderRoute>
            <PendingDeliveries></PendingDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "my-earnings",
        element: (
          <RiderRoute>
            <MyEarnings></MyEarnings>
          </RiderRoute>
        ),
      },
      // Admin only routes
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "pending-riders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "active-riders",
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
    ],
  },
]);
