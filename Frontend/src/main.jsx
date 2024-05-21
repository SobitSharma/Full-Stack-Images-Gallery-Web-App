import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from './Component/Home.jsx'
import Login from './Component/Login.jsx'
import Upload from './Component/Upload.jsx'
import Signup from './Component/Signup.jsx'
import YourImages from './Component/YourImages.jsx'
import ViewAll from './Component/ViewAll.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='Signup' element={<Signup/>}></Route>
      <Route path='Upload' element={<Upload/>}></Route>
      <Route path='yourimages' element={<YourImages/>}></Route>
      <Route path='viewall' element={<ViewAll/>}></Route>
    </Route>
  
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
