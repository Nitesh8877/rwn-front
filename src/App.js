import React ,{ Suspense} from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import NotFound from './pages/Notfound'
import Unauthorized from './pages/Unauthorized'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
// import 'react-circular-progressbar/dist/styles.css';
// import '@coreui/coreui/dist/css/coreui.min.css';
// import '@coreui/coreui/dist/js/coreui.min.js';
import './App.css'
import Dashboard from './pages/dashboard/dashboard'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route 
        exact
        path='/'
        element={<Suspense fallback={<div className='loader'></div>}>
         <Login/>
        </Suspense>}
        />

        <Route
        exact
        path='/unauthorized'
        element={
          <Suspense fallback={<div className='loader'></div>}>
            <Unauthorized/>
          </Suspense>
        }
        />
        <Route
        exact
        path='/*'
        element={
          <Suspense fallback={<div className='loader'></div>}>
            <NotFound/>
          </Suspense>
        }
        />
        <Route
        exact 
        path='/dashboard'
        element={
          <Suspense fallback={<div className='loader'></div>}><Dashboard/></Suspense>
        }

        />
      </Routes>
    </Router>
  )
}

