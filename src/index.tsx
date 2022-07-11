import React from 'react';
import ReactDOM from 'react-dom/client';
import Profile from './components/Profile';
import ProfileForm from './components/Profile/ProfileForm'
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      </Route>
      <Route path='/profile' element={<Profile />}>
      </Route>
      <Route path='/editprofile' element={<ProfileForm />}>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
