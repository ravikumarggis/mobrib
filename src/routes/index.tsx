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
import ViewUser from "../pages/UserManagement/ViewUser";
import HelpCategoryList from "../pages/HelpSupport/CategoryList";
import Ticket from "../pages/Task/Ticket";
import ViewTask from "../pages/Task/ViewTask";
// import Ticket from "../pages/HelpSupport/Ticket";

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: "/withdraw-inr", element: <WithdrawInr /> },

      { path: "/withdraw-view", element: <WithDrawCryptoView /> },
      { path: "/kyc-view", element: <KycView /> },
      { path: "/user-list", element: <UserList /> },
      { path: "/view-user", element: <ViewUser /> },
    
      { path: "/category-list", element: <CategoryList /> },
      { path: "/add-category", element: <AddCategory /> },
      { path: "/kyc-list", element: <KycList /> },
      { path: "/helpandsupport-list", element: <HelpCategoryList /> },

      // { path: "/view-subcategory/:id", element: <SubCategoryList /> },
      // { path: "/view-QuestionAnswer/:id", element: <ViewQuestionAnswerList /> },
      // { path: "/Add-QuestionAnswer/:id", element: <AddQuestionAndAnswer /> },
      { path: "/task-list", element: <Ticket /> },
      { path: "/view-task", element: <ViewTask /> },
      // { path: "/tickets-details/:id", element: <TicketDetails /> },
    ],
  },
  { path: "/", element: <SignIn /> },
  { path: "*", element: <NotFound /> },
  // { path: "/view-pdf", element: <ViewPDF /> },
];

export default routes;
