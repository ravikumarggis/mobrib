import { RouteObject } from "react-router";
import AppLayout from "../layout/AppLayout";
import SignIn from "../pages/AuthPages/SignIn";
import WithDrawCryptoView from "../pages/WithdrawManagement/ViewCrypto";
import WithdrawInr from "../pages/WithdrawManagement/WithdrawInr";
import NotFound from "../pages/OtherPage/NotFound";
import UserList from "../pages/UserManagement/UserList";
import CategoryList from "../pages/CategoryManagement/CategoryList";
import AddCategory from "../pages/CategoryManagement/AddCategory";
import KycList from "../pages/KycManagement/KycList";
import KycView from "../pages/KycManagement/ViewKyc";

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: "/withdraw-inr", element: <WithdrawInr /> },

      { path: "/withdraw-view", element: <WithDrawCryptoView /> },
      { path: "/kyc-view", element: <KycView /> },
      { path: "/user-list", element: <UserList /> },
      { path: "/category-list", element: <CategoryList /> },
      { path: "/add-category", element: <AddCategory /> },
      { path: "/kyc-list", element: <KycList /> },
    ],
  },
  { path: "/", element: <SignIn /> },
  { path: "*", element: <NotFound /> },
  // { path: "/view-pdf", element: <ViewPDF /> },
];

export default routes;
