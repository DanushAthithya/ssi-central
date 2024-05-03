import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

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
          <Route path='/userHome/ssiFilter' element={<SSIList/>}/>
          <Route path='/adminHome/userFilter' element={<UserList/>}/>
          <Route path='/userHome/visualization' element={<ChartController/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
