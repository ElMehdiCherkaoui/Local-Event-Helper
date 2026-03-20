import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardAdmin from './pages/admin/Dashboard';
import UserAdmin from './pages/admin/Users';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<DashboardAdmin />} />
        <Route path='/users' element={<UserAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}
