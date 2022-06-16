import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Login = lazy(() => import("../views/Login.js"));
const Products = lazy(() => import("../views/ui/Products"));
const TypeOfProduct = lazy(() => import("../views/ui/TypeOfProduct"));
const Discount = lazy(() => import("../views/ui/Discount"));
const Evaluation = lazy(() => import("../views/ui/Evaluation"));
const Bill = lazy(() => import("../views/ui/Bill"));
/*****Routes******/

const ThemeRoutes = [
  // {
  //   path: "/",
  //   children: [
  //     { path: "/", element: <Navigate to="/login" /> },
  //     { path: "/login", exact: true, element: <Login /> },
      
  //   ],
  // },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/products", exact: true, element: <Products /> },
      { path: "/typeofproduct", exact: true, element: <TypeOfProduct /> },
      { path: "/discount", exact: true, element: <Discount /> },
      { path: "/evaluation", exact: true, element: <Evaluation /> },
      { path: "/bill", exact: true, element: <Bill /> },
    ],
  },
  
];

export default ThemeRoutes;
