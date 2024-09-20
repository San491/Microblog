import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import './index.css'
import { AuthContext } from './context/authContext.tsx';
import { useContext } from 'react';
import Navbar from './components/Navbar/Navbar.tsx';
import LeftBar from './components/leftBar/LeftBar.tsx';
import RightBar from './components/rightBar/RightBar.tsx';
import LoginPage from './pages/Login/LoginPage.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import ProfilePage from './pages/Profile/ProfilePage.tsx';
import './styles.css';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'


function App() {

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be within AuthContextProvider, app");
  }
  const { currentUser } = authContext;

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className='light-theme'>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
      </QueryClientProvider>
    )
  }


  const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
          {
            path: "/",
            element: <HomePage />
          },
          {
            path: "/profile/:id",
            element: <ProfilePage />
          }
        ]
      },
      {
        path: "/login",
        element: <LoginPage />,
      }

    ]
  )

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;