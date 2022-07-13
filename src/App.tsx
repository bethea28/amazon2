import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './components/Profile';
import ProfileForm from './components/Profile/ProfileForm'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/profile' element={<Profile />}>
        </Route>
        <Route path='/profile/edit' element={<ProfileForm />}>
        </Route>
      </Routes>
  </BrowserRouter>
  )

}

export default App;
