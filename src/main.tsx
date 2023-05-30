import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFound from './components/notfound.tsx'
import Auth from './components/Auth.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './views/Home.tsx'
import AddressBook from './views/AddressBook.tsx'
import Dashboard from './views/Dashboard.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/addressBook',
    element: <AddressBook />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
