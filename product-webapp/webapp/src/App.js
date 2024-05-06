import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHome from './components/AdminPage/AdminHome';
import LandingPageHome from './components/LandingPage/LandingPageHome';
import AdminNavbar from './components/Navbar/AdminNavbar';
import UserNavbar from './components/Navbar/UserNavbar';
import CreateUser from './components/Registration/CreateUser';
import UpdateUser from './components/Update/UpdateUser';
import UserHome from './components/UserPage/UserHome';
import ChartController from './components/charts/ChartController';
import SSIList from './components/filterSSI/SSIList';
import UserList from './components/filterUser/UserList';
import Form from './components/form/Form';
import UpdateForm from './components/form/UpdateForm';
import ForgotPassword from './components/login/ForgotPassword';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPageHome/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/userHome' element={<UserHome/>}/>
          <Route path='/adminHome' element={<AdminHome/>}/>
          <Route path='/userHome/createSSI' element={<div><UserNavbar/><Form/></div>}/>
          <Route path='/userHome/updateSSI' element={<div><UserNavbar/><UpdateForm/></div>}/>
          <Route path='/userHome/ssiFilter' element={<div><UserNavbar/><SSIList/></div>}/>
          <Route path='/adminHome/userFilter' element={<div><AdminNavbar/><UserList/></div>}/>
          <Route path='/adminHome/updateUser' element={<div><AdminNavbar/><UpdateUser/></div>}/>
          <Route path='/adminHome/createUser' element={<div><AdminNavbar/><CreateUser/></div>}/>
          <Route path='/userHome/visualization' element={<div><UserNavbar/><ChartController/></div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
