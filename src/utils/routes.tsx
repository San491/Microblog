import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";

export const routes = [
    {
      path: "/",
      element: <HomePage/>,
    },
    {
        path:"/login",
        element: <LoginPage/>,
    }
    
  ];

