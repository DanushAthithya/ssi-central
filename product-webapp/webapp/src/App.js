import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHome from './components/AdminPage/AdminHome';
import CreateUserHomePage from './components/AdminPage/CreateUserHomePage';
import UpdateUserHomePage from './components/AdminPage/UpdateUserHomePage';
import UserListHome from './components/AdminPage/UserListHome';
import LandingPageHome from './components/LandingPage/LandingPageHome';
import FormHomePage from './components/UserPage/FormHomePage';
import UpdateFormHomePage from './components/UserPage/UpdateFormHomePage';
import UpdateSSIListHome from './components/UserPage/UpdateSSIListHome';
import UserHome from './components/UserPage/UserHome';
import VisualisationHome from './components/UserPage/VisualisationHome';
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
          <Route path='/userHome/createSSI' element={<FormHomePage/>}/>
          <Route path='/userHome/updateSSI' element={<UpdateFormHomePage/>}/>
          <Route path='/userHome/ssiFilter' element={<UpdateSSIListHome/>}/>
          <Route path='/adminHome/userFilter' element={<UserListHome/>}/>
          <Route path='/adminHome/updateUser' element={<UpdateUserHomePage/>}/>
          <Route path='/adminHome/createUser' element={<CreateUserHomePage/>}/>
          <Route path='/userHome/visualization' element={<VisualisationHome/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
