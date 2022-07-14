import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './Components/Profile';
import ProfileForm from './Components/Profile/ProfileForm'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/profile/:userId' element={<Profile />}>
        </Route>
        <Route path='/profile/:userId/edit' element={<ProfileForm />}>
        </Route>
      </Routes>
  </BrowserRouter>
  )

}

export default App;
