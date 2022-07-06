import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './components/core/Profile';
import ProfileForm from './components/core/Profile/ProfileForm'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/profile' element={<Profile />}>
        </Route>
        <Route path='/editprofile' element={<ProfileForm />}>
        </Route>
      </Routes>
  </BrowserRouter>
  )

}

export default App;
