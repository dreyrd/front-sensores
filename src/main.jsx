import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Login } from './pages/login.jsx'
import { Home } from './pages/home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/roboto';


const router = createBrowserRouter([

  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
